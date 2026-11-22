import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { planTotal } from "./plans";
import { db } from "@/server/db.server";
import { currentUser } from "@/server/auth.server";

const API = "https://api.paystack.co";

function getSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new Error("PAYSTACK_SECRET_KEY is not set. Add it to the server's environment (.env).");
  }
  return key;
}

type PaystackVerify = {
  status: boolean;
  message: string;
  data: {
    reference: string;
    amount: number;
    currency: string;
    status: string;
    paid_at: string;
    customer: { email: string };
    metadata: { plan: string; billing: string; user_id?: string | null };
  };
};

export const initializePayment = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().trim().email(),
      plan: z.string(),
      billing: z.enum(["monthly", "yearly"]),
      returnUrl: z.string().url(),
    }),
  )
  .handler(async ({ data }) => {
    const { email, plan, billing, returnUrl } = data;
    const user = await currentUser();

    // Price is looked up on the server so it can't be changed via the URL.
    const amount = planTotal(plan, billing);
    if (amount == null) return { status: false, message: `Unknown plan "${plan}".`, data: null };

    const res = await fetch(`${API}/transaction/initialize`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getSecretKey()}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        amount: amount * 100,
        currency: "USD",
        metadata: { plan, billing, user_id: user?.id ?? null },
        callback_url: returnUrl,
      }),
    });

    return res.json() as Promise<{
      status: boolean;
      message: string;
      data: { authorization_url: string; access_code: string; reference: string } | null;
    }>;
  });

/** Verify a Paystack transaction and record the subscription in PostgreSQL. */
export const confirmPayment = createServerFn({ method: "POST" })
  .validator(z.object({ reference: z.string().min(1).max(200) }))
  .handler(async ({ data }) => {
    const res = await fetch(`${API}/transaction/verify/${encodeURIComponent(data.reference)}`, {
      headers: { Authorization: `Bearer ${getSecretKey()}` },
    });
    const body = (await res.json()) as PaystackVerify;

    if (!body.status || body.data?.status !== "success") {
      return { ok: false as const, message: body.message || "Payment was not successful." };
    }

    const { plan, billing, user_id } =
      body.data.metadata ?? ({} as PaystackVerify["data"]["metadata"]);
    const expected = planTotal(plan, billing);
    if (expected == null || body.data.amount < expected * 100) {
      return { ok: false as const, message: "Paid amount does not match the selected plan." };
    }

    const amount = body.data.amount / 100;
    await db()`
      insert into subscriptions (user_id, email, plan, billing, amount, reference, status, paid_at)
      values (
        (select id from users where id = ${user_id || null}::uuid),
        ${body.data.customer.email}, ${plan}, ${billing}, ${amount}, ${body.data.reference}, 'active', ${body.data.paid_at}
      )
      on conflict (reference) do nothing
    `;

    return { ok: true as const, email: body.data.customer.email, plan, billing, amount };
  });
