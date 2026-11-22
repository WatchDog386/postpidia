import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check, ChevronLeft, Loader } from "lucide-react";
import { confirmPayment, initializePayment } from "@/lib/paystack-server";
import { PLAN_FEATURES, PLAN_PRICES, planTotal } from "@/lib/plans";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/payment")({
  component: PaymentPage,
  validateSearch: (search: Record<string, unknown>) => ({
    plan: typeof search.plan === "string" && search.plan in PLAN_PRICES ? search.plan : "Basic",
    billing: search.billing === "yearly" ? ("yearly" as const) : ("monthly" as const),
    trxref: typeof search.trxref === "string" ? search.trxref : "",
    reference: typeof search.reference === "string" ? search.reference : "",
  }),
});

function PaymentPage() {
  const { plan, billing, trxref, reference } = Route.useSearch();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"details" | "paying" | "verifying" | "success">("details");
  const [paid, setPaid] = useState<{ plan: string; billing: string; amount: number } | null>(null);
  const verified = useRef(false);

  const features = PLAN_FEATURES[plan] ?? [];
  const totalAmount = planTotal(plan, billing) ?? 0;
  const ref = trxref || reference;
  const per = billing === "yearly" ? "yr" : "mo";

  useEffect(() => {
    if (user?.email && !email) setEmail(user.email);
  }, [user, email]);

  useEffect(() => {
    if (!ref || verified.current) return;
    verified.current = true;
    setStep("verifying");
    confirmPayment({ data: { reference: ref } })
      .then((res) => {
        if (res.ok) {
          setEmail(res.email);
          setPaid({ plan: res.plan, billing: res.billing, amount: res.amount });
          setStep("success");
        } else {
          toast.error(res.message || "Payment verification failed.");
          setStep("details");
        }
      })
      .catch(() => {
        toast.error("Could not verify payment. Contact support.");
        setStep("details");
      });
  }, [ref]);

  const handlePay = async () => {
    if (!email) return;
    setStep("paying");

    try {
      const res = await initializePayment({
        data: {
          email,
          plan,
          billing,
          returnUrl: window.location.origin + "/payment",
        },
      });

      if (res.status && res.data?.authorization_url) {
        window.location.href = res.data.authorization_url;
      } else {
        toast.error(res.message || "Failed to initialize payment.");
        setStep("details");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment could not be processed. Please try again.");
      setStep("details");
    }
  };

  if (step === "verifying") {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4">
        <div className="bg-[#1a1a1a] rounded-2xl p-10 max-w-md w-full text-center border border-[#333]">
          <Loader className="w-10 h-10 text-[#f0514e] animate-spin mx-auto mb-6" />
          <h1 className="text-xl font-bold text-white mb-2">Verifying Payment...</h1>
          <p className="text-gray-400 text-sm">Please wait while we confirm your transaction.</p>
        </div>
      </div>
    );
  }

  if (step === "success" && paid) {
    const paidPer = paid.billing === "yearly" ? "yr" : "mo";
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4">
        <div className="bg-[#1a1a1a] rounded-2xl p-10 max-w-md w-full text-center border border-[#333]">
          <div className="w-16 h-16 bg-[#00d084]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#00d084]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-gray-400 text-sm mb-2">
            Your <span className="text-white font-semibold">{paid.plan}</span> plan is now active.
          </p>
          <p className="text-gray-500 text-xs mb-8">
            Billed {paid.billing === "yearly" ? "annually" : "monthly"} — ${paid.amount}/{paidPer}
          </p>
          {email && (
            <p className="text-gray-500 text-xs mb-6">
              A receipt has been sent to <span className="text-gray-300">{email}</span>
            </p>
          )}
          <div className="flex flex-col gap-3">
            <Link
              to={user ? "/upload" : "/auth"}
              search={user ? undefined : { mode: "signup", redirect: "/upload" }}
              className="inline-block bg-[#00d084] text-white text-sm font-medium px-8 py-3 rounded-full hover:opacity-90 transition-all"
            >
              {user ? "Upload your first footage" : "Create your account to upload footage"}
            </Link>
            <Link to="/" className="text-sm text-gray-400 hover:text-white">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link
          to="/pricing"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to plans
        </Link>

        <div className="grid md:grid-cols-5 gap-6 md:gap-8">
          <div className="md:col-span-3">
            <div className="bg-[#1a1a1a] rounded-2xl p-6 md:p-8 border border-[#333]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">{plan}</h1>
                  <p className="text-gray-400 text-sm mt-1">
                    {billing === "yearly" ? "Billed annually" : "Billed monthly"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-light text-[#f97316]">${totalAmount}</span>
                  <span className="text-gray-400 text-sm">/{per}</span>
                </div>
              </div>

              <div className="border-t border-[#333] pt-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  What's included
                </h3>
                <ul className="space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-[#00d084] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-[#1a1a1a] rounded-2xl p-6 md:p-8 border border-[#333] md:sticky md:top-10">
              <h2 className="text-lg font-bold text-white mb-6">Complete Payment</h2>

              <div className="space-y-4">
                <div>
                  <label
                    className="text-xs text-gray-400 font-medium block mb-1.5"
                    htmlFor="pay-email"
                  >
                    Email Address
                  </label>
                  <input
                    id="pay-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#222] border border-[#444] rounded-lg px-4 py-3 text-[16px] md:text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#f0514e] transition-colors"
                  />
                </div>

                <div className="bg-[#222] rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Plan</span>
                    <span className="text-white font-medium">{plan}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Billing</span>
                    <span className="text-white font-medium capitalize">{billing}</span>
                  </div>
                  <div className="border-t border-[#444] pt-2 mt-2 flex justify-between text-sm">
                    <span className="text-gray-400">Total</span>
                    <span className="text-[#f97316] font-semibold">
                      ${totalAmount}/{per}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePay}
                  disabled={!email || step === "paying"}
                  className="w-full bg-[#00d084] text-white text-sm font-medium px-6 py-3.5 rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {step === "paying" ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay $${totalAmount}/${per}`
                  )}
                </button>

                <p className="text-[11px] text-gray-500 text-center">
                  Secured by Paystack. Your payment info is encrypted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
