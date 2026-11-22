// The plans offered on the pricing page. This is the single source of truth for prices:
// the payment page displays these amounts and the server charges them, so a price
// edited in the browser's address bar has no effect.

export type Billing = "monthly" | "yearly";

export type Plan = {
  name: string;
  desc: string;
  /** Price per month when billed monthly, in USD. */
  monthly: number;
  /** Price per month when billed annually, in USD (charged as 12 months up front). */
  yearly: number;
  popular: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Basic",
    desc: "Perfect for small brands getting started with video content",
    monthly: 99,
    yearly: 79,
    popular: false,
    features: [
      "Up to 4 Edited Videos",
      "Royalty-Free Background Music",
      "Advanced Color Grading",
      "Noise Reduction & Audio Leveling",
      "Custom Thumbnail (1 per video)",
      "3% Sales Commission Agreement",
    ],
  },
  {
    name: "Essential",
    desc: "Best value for growing brands ready to scale their content output",
    monthly: 149,
    yearly: 119,
    popular: true,
    features: [
      "Up to 5 Edited Videos",
      "Dynamic Motion Graphics",
      "Advanced Color Correction",
      "A/B Testing Thumbnail Variations",
      "Dedicated Project Manager",
      "Multi-Platform Exports (TikTok/YT/IG)",
      "3% Sales Commission Agreement",
    ],
  },
  {
    name: "Professional",
    desc: "Full-service for brands serious about dominating social commerce",
    monthly: 189,
    yearly: 149,
    popular: false,
    features: [
      "Up to 8 Edited Videos",
      "High-End 2D/3D Animations",
      "Custom Brand Identity Kit",
      "Premium Stock Footage Access",
      "Performance Analytics Consulting",
      "Dedicated Project Manager",
      "Postpidia Asset Library Access",
      "24-Hour Priority Support",
      "Professional Voiceover Integration",
      "SEO & Keyword Strategy for Video",
      "3% Sales Commission Agreement",
    ],
  },
];

export function findPlan(name: string): Plan | undefined {
  return plans.find((p) => p.name.toLowerCase() === String(name).toLowerCase());
}

/** Amount charged for one billing period, in USD. */
export function planTotal(plan: Plan, billing: Billing): number {
  return billing === "yearly" ? plan.yearly * 12 : plan.monthly;
}
