import { Star } from "lucide-react";
import { STATUS_META, STATUS_STEPS } from "@/lib/project-meta";
import type { ProjectStatus } from "@/lib/types";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${meta.className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}

export function StatusTimeline({ status }: { status: ProjectStatus }) {
  const current = STATUS_META[status].step;
  if (current < 0) return null;
  return (
    <ol className="flex items-start">
      {STATUS_STEPS.map((label, i) => {
        const done = i < current || (i === current && status === "completed");
        const active = i === current && status !== "completed";
        return (
          <li key={label} className="relative flex flex-1 flex-col items-center text-center">
            {i > 0 && (
              <span
                className={`absolute right-1/2 top-[11px] h-[2px] w-full ${i <= current ? "bg-[#f0514e]" : "bg-white/10"}`}
                aria-hidden
              />
            )}
            <span
              className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold ${
                done
                  ? "border-[#f0514e] bg-[#f0514e] text-white"
                  : active
                    ? "border-[#f0514e] bg-[#111111] text-[#f0514e]"
                    : "border-white/15 bg-[#111111] text-gray-600"
              }`}
            >
              {done ? "✓" : i + 1}
            </span>
            <span
              className={`mt-2 text-[10px] leading-tight sm:text-xs ${done || active ? "text-gray-200" : "text-gray-600"}`}
            >
              {i === 2 && status === "revision_requested" ? "Revising" : label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function Stars({
  value,
  onChange,
  size = 16,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
}) {
  return (
    <div
      className="flex items-center gap-0.5"
      role={onChange ? "radiogroup" : undefined}
      aria-label={`${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= value;
        const star = (
          <Star
            style={{ width: size, height: size }}
            className={filled ? "fill-[#ffb300] text-[#ffb300]" : "text-gray-600"}
          />
        );
        return onChange ? (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={n === value}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => onChange(n)}
            className="rounded p-1 transition-transform active:scale-90"
          >
            {star}
          </button>
        ) : (
          <span key={n}>{star}</span>
        );
      })}
    </div>
  );
}

export const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#141414] px-4 py-3 text-[16px] text-white placeholder:text-gray-600 outline-none transition-colors focus:border-[#f0514e]/70 focus:ring-2 focus:ring-[#f0514e]/20 md:text-sm";

export const labelClass = "mb-1.5 block text-xs font-medium text-gray-400";

export const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#f0514e] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#f0514e]/20 transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";

export const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-gray-200 transition-colors hover:bg-white/5 active:scale-[0.98] disabled:opacity-50";
