import { createServerFn } from "@tanstack/react-start";
import { findPlan, planTotal, type Billing } from "./plans";

const API = "https://api.paystack.co";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new Error("PAYSTACK_SECRET_KEY is not set. Add it to the .env file on the server.");
  }
  return key;
}

/**
 * Starts a Paystack checkout. The amount is worked out here from the plan list,
 * never taken from the browser, so it cannot be changed by editing the page address.
 */
export const initializePayment = createServerFn({ method: "POST" })
  .validator((d: { email: string; plan: string; billing: string; returnUrl: string }) => {
    const plan = findPlan(d.plan);
    if (!plan) throw new Error("Unknown plan.");
    const billing: Billing = d.billing === "yearly" ? "yearly" : "monthly";
    const email = String(d.email || "").trim();
    if (!EMAIL_RE.test(email)) throw new Error("Enter a valid email address.");
    if (!/^https?:\/\//.test(String(d.returnUrl))) throw new Error("Invalid return address.");
    return { email, plan: plan.name, billing, amount: planTotal(plan, billing), returnUrl: d.returnUrl };
  })
  .handler(async ({ data }) => {
    const res = await fetch(`${API}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getSecretKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        amount: Math.round(data.amount * 100),
        currency: "USD",
        metadata: { plan: data.plan, billing: data.billing },
        // Where Paystack sends the customer after paying (this site, whatever domain it runs on).
        callback_url: data.returnUrl,
      }),
    });

    return res.json() as Promise<{
      status: boolean;
      message: string;
      data: { authorization_url: string; access_code: string; reference: string };
    }>;
  });

/**
 * Confirms a payment with Paystack and, if it really succeeded, records the
 * subscription in the local database. Only the facts Paystack reports are trusted.
 */
export const verifyPayment = createServerFn({ method: "POST" })
  .validator((d: { reference: string }) => {
    const reference = String(d.reference || "").trim();
    if (!/^[A-Za-z0-9._=-]{1,100}$/.test(reference)) throw new Error("Invalid payment reference.");
    return { reference };
  })
  .handler(async ({ data }) => {
    const res = await fetch(`${API}/transaction/verify/${encodeURIComponent(data.reference)}`, {
      headers: { Authorization: `Bearer ${getSecretKey()}` },
    });
    const body = (await res.json()) as {
      status: boolean;
      message: string;
      data?: {
        reference: string;
        amount: number;
        currency: string;
        status: string;
        paid_at: string;
        customer: { email: string };
        metadata?: { plan?: string; billing?: string };
      };
    };

    const tx = body.data;
    // body.status only means Paystack answered; tx.status says whether the money arrived.
    if (!body.status || !tx || tx.status !== "success") {
      return { ok: false as const, message: tx?.status ? `Payment ${tx.status}.` : body.message };
    }

    const plan = tx.metadata?.plan ?? "Unknown";
    const billing = tx.metadata?.billing === "yearly" ? "yearly" : "monthly";
    const amount = tx.amount / 100;

    const { saveSubscription } = await import("./db.server");
    saveSubscription({
      email: tx.customer.email,
      plan,
      billing,
      amount,
      currency: tx.currency,
      reference: tx.reference,
      paidAt: tx.paid_at,
    });

    return { ok: true as const, email: tx.customer.email, plan, billing, amount, currency: tx.currency };
  });
