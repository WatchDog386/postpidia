/** Single source of truth for plan prices (USD). The server charges from this table, never from the URL. */
export const PLAN_PRICES: Record<string, { monthly: number; yearly: number; videos: number }> = {
  Basic: { monthly: 99, yearly: 79, videos: 4 },
  Essential: { monthly: 149, yearly: 119, videos: 5 },
  Professional: { monthly: 189, yearly: 149, videos: 8 },
};

/** Amount charged for a checkout. Yearly prices are quoted per month and billed for 12 months. */
export function planTotal(plan: string, billing: string): number | null {
  const p = PLAN_PRICES[plan];
  if (!p) return null;
  return billing === "yearly" ? p.yearly * 12 : p.monthly;
}

export const PLAN_FEATURES: Record<string, string[]> = {
  Basic: [
    "Up to 4 Edited Videos",
    "Royalty-Free Background Music",
    "Advanced Color Grading",
    "Noise Reduction & Audio Leveling",
    "Custom Thumbnail (1 per video)",
    "3% Sales Commission Agreement",
  ],
  Essential: [
    "Up to 5 Edited Videos",
    "Dynamic Motion Graphics",
    "Advanced Color Correction",
    "A/B Testing Thumbnail Variations",
    "Dedicated Project Manager",
    "Multi-Platform Exports (TikTok/YT/IG)",
    "3% Sales Commission Agreement",
  ],
  Professional: [
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
};
