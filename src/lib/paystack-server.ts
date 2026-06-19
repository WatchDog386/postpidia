import { createServerFn } from "@tanstack/react-start";

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

export const initializePayment = createServerFn({ method: "POST" })
  .validator((d: { email: string; amount: number; plan: string; billing: string }) => d)
  .handler(async ({ data }) => {
    const { email, amount, plan, billing } = data;

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
        metadata: { plan, billing },
      }),
    });

    return res.json() as Promise<{
      status: boolean;
      message: string;
      data: { authorization_url: string; access_code: string; reference: string };
    }>;
  });

export const verifyPayment = createServerFn({ method: "POST" })
  .validator((d: { reference: string }) => d)
  .handler(async ({ data }) => {
    const res = await fetch(`${API}/transaction/verify/${data.reference}`, {
      headers: { Authorization: `Bearer ${getSecretKey()}` },
    });

    return res.json() as Promise<{
      status: boolean;
      message: string;
      data: {
        reference: string;
        amount: number;
        currency: string;
        status: string;
        paid_at: string;
        customer: { email: string };
        metadata: { plan: string; billing: string };
      };
    }>;
  });
