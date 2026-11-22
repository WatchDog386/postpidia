import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, Plus, Star, UserRound } from "lucide-react";
import { useAuth } from "@/lib/auth";

const tabs = [
  { to: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  {
    to: "/dashboard",
    label: "Projects",
    icon: LayoutGrid,
    match: (p: string) =>
      p.startsWith("/dashboard") || p.startsWith("/projects") || p.startsWith("/admin"),
  },
  {
    to: "/upload",
    label: "Upload",
    icon: Plus,
    match: (p: string) => p.startsWith("/upload"),
    primary: true,
  },
  { to: "/reviews", label: "Reviews", icon: Star, match: (p: string) => p.startsWith("/reviews") },
  {
    to: "/account",
    label: "Account",
    icon: UserRound,
    match: (p: string) => p.startsWith("/account") || p.startsWith("/auth"),
  },
] as const;

/** App-style bottom navigation, shown below the md breakpoint only. */
export function MobileTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useAuth();

  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed inset-x-0 bottom-0 z-[60] border-t border-white/[0.06] bg-[#141414]/95 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5 h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          const to = tab.to === "/account" && !user ? "/auth" : tab.to;
          if ("primary" in tab && tab.primary) {
            return (
              <li key={tab.label} className="flex items-start justify-center">
                <Link
                  to={to}
                  aria-label="Upload footage"
                  className="-mt-5 flex flex-col items-center gap-1"
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0514e] to-[#DF8885] text-white shadow-lg shadow-[#f0514e]/40 ring-4 ring-[#111111] transition-transform active:scale-95 ${
                      active ? "scale-105" : ""
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.5} />
                  </span>
                  <span
                    className={`text-[10px] font-medium ${active ? "text-white" : "text-gray-500"}`}
                  >
                    {tab.label}
                  </span>
                </Link>
              </li>
            );
          }
          return (
            <li key={tab.label}>
              <Link
                to={to}
                className="relative flex h-full flex-col items-center justify-center gap-1 transition-colors active:opacity-70"
              >
                {active && (
                  <span
                    className="absolute top-0 h-[3px] w-8 rounded-b-full bg-[#f0514e]"
                    aria-hidden
                  />
                )}
                <Icon
                  className={`h-[22px] w-[22px] ${active ? "text-[#f0514e]" : "text-gray-500"}`}
                />
                <span
                  className={`text-[10px] font-medium ${active ? "text-white" : "text-gray-500"}`}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
