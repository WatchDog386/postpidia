import type { ProjectStatus } from "./supabase";

export const PLATFORMS = [
  { value: "tiktok", label: "TikTok / TikTok Shop" },
  { value: "reels", label: "Instagram Reels" },
  { value: "shorts", label: "YouTube Shorts" },
  { value: "youtube", label: "YouTube (long-form)" },
  { value: "amazon", label: "Amazon product video" },
  { value: "other", label: "Other" },
] as const;

export const VIDEO_TYPES = [
  { value: "product-ad", label: "Product ad" },
  { value: "ugc", label: "UGC / testimonial" },
  { value: "unboxing", label: "Unboxing / demo" },
  { value: "talking-head", label: "Talking head" },
  { value: "vlog", label: "Vlog / lifestyle" },
  { value: "promo", label: "Promo / trailer" },
  { value: "other", label: "Other" },
] as const;

export const ASPECT_RATIOS = ["9:16", "1:1", "4:5", "16:9"] as const;

export const STATUS_META: Record<
  ProjectStatus,
  { label: string; className: string; step: number }
> = {
  submitted: {
    label: "Submitted",
    className: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    step: 0,
  },
  in_review: {
    label: "In review",
    className: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    step: 1,
  },
  editing: {
    label: "Editing",
    className: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    step: 2,
  },
  revision_requested: {
    label: "Revision requested",
    className: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    step: 2,
  },
  delivered: {
    label: "Delivered",
    className: "bg-[#00d084]/15 text-[#3ee6a6] border-[#00d084]/30",
    step: 3,
  },
  completed: {
    label: "Completed",
    className: "bg-[#00d084]/25 text-[#3ee6a6] border-[#00d084]/40",
    step: 4,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-white/5 text-gray-400 border-white/10",
    step: -1,
  },
};

export const STATUS_STEPS = ["Submitted", "In review", "Editing", "Delivered", "Completed"];

export function labelFor(list: readonly { value: string; label: string }[], value: string) {
  return list.find((i) => i.value === value)?.label ?? value;
}

export function formatBytes(bytes: number | null | undefined) {
  if (!bytes && bytes !== 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  let n = bytes;
  let u = 0;
  while (n >= 1024 && u < units.length - 1) {
    n /= 1024;
    u++;
  }
  return `${n.toFixed(n < 10 && u > 0 ? 1 : 0)} ${units[u]}`;
}

export function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
