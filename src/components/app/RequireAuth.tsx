import { useEffect, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase";
import { PageLoader } from "./AppShell";

/** Redirects to /auth when signed out. With `admin`, also requires the admin role. */
export function RequireAuth({ children, admin }: { children: ReactNode; admin?: boolean }) {
  const { user, loading, isAdmin, profile } = useAuth();
  const navigate = useNavigate();
  const href = useRouterState({ select: (s) => s.location.href });

  useEffect(() => {
    if (!loading && !user && isSupabaseConfigured) {
      void navigate({ to: "/auth", search: { mode: "signin", redirect: href } });
    }
  }, [loading, user, href, navigate]);

  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-sm text-amber-200">
        Accounts aren't configured yet. Add <code>VITE_SUPABASE_URL</code> and{" "}
        <code>VITE_SUPABASE_ANON_KEY</code> to your environment and run the SQL migration in{" "}
        <code>supabase/migrations</code>.
      </div>
    );
  }
  if (loading || !user || (admin && !profile)) return <PageLoader />;
  if (admin && !isAdmin) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-[#1a1a1a] p-8 text-center">
        <h2 className="text-lg font-semibold text-white">Editors only</h2>
        <p className="mt-2 text-sm text-gray-400">This area is for the Postpidia editing team.</p>
        <Link to="/dashboard" className="mt-5 inline-block text-sm text-[#f0514e] hover:underline">
          Go to my projects
        </Link>
      </div>
    );
  }
  return <>{children}</>;
}
