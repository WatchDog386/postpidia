const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_API = "https://api.paystack.co";

export async function initializeTransaction({
  email,
  amount,
  plan,
}: {
  email: string;
  amount: number;
  plan: string;
}) {
  const response = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amount * 100,
      metadata: { plan },
    }),
  });
  return response.json();
}

export async function verifyTransaction(reference: string) {
  const response = await fetch(
    `${PAYSTACK_API}/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    },
  );
  return response.json();
}
