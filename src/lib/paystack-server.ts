import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { planTotal } from "./plans";

const API = "https://api.paystack.co";

function getSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new Error(
      "PAYSTACK_SECRET_KEY is not set. " +
        "For Vercel: add it in Project Settings > Environment Variables. " +
        "For local dev: add it to your .env file.",
    );
  }
  return key;
}

function serverSupabase() {
  const url =
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
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
    (d: {
      email: string;
      plan: string;
      billing: string;
      returnUrl: string;
      userId?: string | null;
    }) => d,
  )
  .handler(async ({ data }) => {
    const { email, plan, billing, returnUrl, userId } = data;

    // Price is looked up on the server so it can't be changed via the URL.
    const amount = planTotal(plan, billing);
    if (amount == null) {
      return { status: false, message: `Unknown plan "${plan}".`, data: null };
    }

    const res = await fetch(`${API}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getSecretKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100,
        currency: "USD",
        metadata: { plan, billing, user_id: userId ?? null },
        callback_url: returnUrl,
      }),
    });

    return res.json() as Promise<{
      status: boolean;
      message: string;
      data: { authorization_url: string; access_code: string; reference: string } | null;
    }>;
  });

/**
 * Verify a Paystack transaction and record the subscription server-side.
 * Requires SUPABASE_SERVICE_ROLE_KEY; without it the payment is still verified but not stored.
 */
export const confirmPayment = createServerFn({ method: "POST" })
  .validator((d: { reference: string }) => d)
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

    const result = {
      ok: true as const,
      email: body.data.customer.email,
      plan,
      billing,
      amount: body.data.amount / 100,
      saved: false,
    };

    const admin = serverSupabase();
    if (!admin) {
      console.error(
        "SUPABASE_SERVICE_ROLE_KEY is not set — subscription was verified but not saved.",
      );
      return result;
    }

    const { error } = await admin.from("subscriptions").upsert(
      {
        email: body.data.customer.email,
        user_id: user_id || null,
        plan,
        billing,
        amount: body.data.amount / 100,
        reference: body.data.reference,
        status: "active",
        paid_at: body.data.paid_at,
      },
      { onConflict: "reference" },
    );
    if (error) console.error("Saving subscription failed:", error);
    return { ...result, saved: !error };
  });
