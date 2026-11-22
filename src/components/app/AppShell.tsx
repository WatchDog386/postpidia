import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";

const links = [
  { to: "/dashboard", label: "My Projects" },
  { to: "/upload", label: "Upload Footage" },
  { to: "/reviews", label: "Reviews" },
  { to: "/pricing", label: "Pricing" },
] as const;

/** Layout for the logged-in app pages: sticky header on desktop, compact title bar on mobile. */
export function AppShell({
  title,
  subtitle,
  back,
  actions,
  children,
  wide,
}: {
  title: string;
  subtitle?: string;
  back?: { to: string; label?: string; params?: Record<string, string> };
  actions?: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, profile, isAdmin, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#111111] text-gray-200">
      {/* Desktop header */}
      <header className="hidden md:block sticky top-0 z-40 border-b border-white/[0.06] bg-[#111111]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="shrink-0">
            <img src="/logo.png" alt="Postpidia" className="h-11 w-auto" />
          </Link>
          <nav className="flex items-center gap-7 text-sm font-medium text-gray-400">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`transition-colors hover:text-white ${pathname.startsWith(l.to) ? "text-[#DF8885]" : ""}`}
              >
                {l.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={`inline-flex items-center gap-1.5 transition-colors hover:text-white ${pathname.startsWith("/admin") ? "text-[#DF8885]" : ""}`}
              >
                <ShieldCheck className="h-4 w-4" /> Studio
              </Link>
            )}
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/account"
                  className="flex items-center gap-2 rounded-full border border-white/10 py-1 pl-1 pr-3 text-sm hover:border-white/20"
                >
                  <Avatar name={profile?.full_name || user.email || "?"} />
                  <span className="max-w-[140px] truncate text-gray-300">
                    {profile?.full_name || user.email}
                  </span>
                </Link>
                <button
                  onClick={() => void signOut()}
                  className="rounded-full p-2 text-gray-500 hover:bg-white/5 hover:text-white"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="rounded-full bg-[#DF8885] px-5 py-2 text-sm font-semibold text-white hover:bg-[#DF8885]/90"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile title bar */}
      <header
        className="md:hidden sticky top-0 z-40 border-b border-white/[0.06] bg-[#111111]/90 backdrop-blur-xl"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex h-14 items-center gap-2 px-4">
          {back ? (
            <Link
              to={back.to}
              params={back.params}
              className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full text-gray-300 active:bg-white/10"
              aria-label={back.label ?? "Back"}
            >
              <ChevronLeft className="h-6 w-6" />
            </Link>
          ) : (
            <Link to="/" className="shrink-0">
              <img src="/logo.png" alt="Postpidia" className="h-8 w-auto" />
            </Link>
          )}
          <h1 className="flex-1 truncate text-[17px] font-semibold text-white">{title}</h1>
          {isAdmin && !pathname.startsWith("/admin") && (
            <Link to="/admin" className="rounded-full p-2 text-gray-400" aria-label="Editor studio">
              <ShieldCheck className="h-5 w-5" />
            </Link>
          )}
        </div>
      </header>

      <main
        className={`mx-auto px-4 pb-10 pt-5 md:px-6 md:pb-16 md:pt-10 ${wide ? "max-w-6xl" : "max-w-4xl"}`}
      >
        <div className="mb-6 hidden items-end justify-between gap-4 md:flex">
          <div>
            {back && (
              <Link
                to={back.to}
                params={back.params}
                className="mb-3 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" /> {back.label ?? "Back"}
              </Link>
            )}
            <h1 className="text-3xl font-light text-white">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
          </div>
          {actions}
        </div>
        {(subtitle || actions) && (
          <div className="mb-5 flex items-center justify-between gap-3 md:hidden">
            {subtitle && <p className="min-w-0 text-[13px] text-gray-400">{subtitle}</p>}
            {actions && (
              <div className="shrink-0 [&_a]:px-4 [&_a]:py-2.5 [&_button]:px-4 [&_button]:py-2.5 [&_*]:whitespace-nowrap">
                {actions}
              </div>
            )}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}

export function Avatar({ name, size = 28 }: { name: string; size?: number }) {
  const initials = name
    .replace(/@.*/, "")
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f0514e] to-[#DF8885] font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials || "?"}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/[0.07] bg-[#1a1a1a] ${className}`}>
      {children}
    </div>
  );
}

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#f0514e] ${className}`}
      aria-label="Loading"
    />
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  );
}
