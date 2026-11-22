import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ChevronRight,
  CreditCard,
  FileText,
  LogOut,
  Shield,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase, type Subscription } from "@/lib/supabase";
import { formatDate } from "@/lib/project-meta";
import { AppShell, Avatar, Card, Spinner } from "@/components/app/AppShell";
import { RequireAuth } from "@/components/app/RequireAuth";
import { inputClass, labelClass, primaryBtn } from "@/components/app/bits";

export const Route = createFileRoute("/account")({
  validateSearch: (s: Record<string, unknown>): { reset?: string } => ({
    reset: typeof s.reset === "string" ? s.reset : undefined,
  }),
  head: () => ({ meta: [{ title: "Account — Postpidia" }] }),
  component: () => (
    <RequireAuth>
      <AccountPage />
    </RequireAuth>
  ),
});

function AccountPage() {
  const { user, profile, isAdmin, refreshProfile, signOut } = useAuth();
  const { reset } = Route.useSearch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", company: "", phone: "" });
  const [busy, setBusy] = useState(false);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [pw, setPw] = useState("");

  useEffect(() => {
    if (profile)
      setForm({
        full_name: profile.full_name ?? "",
        company: profile.company ?? "",
        phone: profile.phone ?? "",
      });
  }, [profile]);

  useEffect(() => {
    supabase
      .from("subscriptions")
      .select("*")
      .order("paid_at", { ascending: false })
      .then(({ data }) => setSubs((data as Subscription[]) ?? []));
  }, [user]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name.trim(),
        company: form.company.trim(),
        phone: form.phone.trim(),
      })
      .eq("id", user.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Profile saved.");
    void refreshProfile();
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) return toast.error(error.message);
    setPw("");
    toast.success("Password updated.");
  };

  const active = subs.find((s) => s.status === "active");

  return (
    <AppShell title="Account">
      <div className="space-y-4">
        <Card className="flex items-center gap-4 p-5">
          <Avatar name={profile?.full_name || user?.email || "?"} size={56} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-semibold text-white">
              {profile?.full_name || "Your profile"}
            </p>
            <p className="truncate text-sm text-gray-500">{user?.email}</p>
          </div>
          {isAdmin && (
            <span className="rounded-full bg-[#DF8885]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#DF8885]">
              Editor
            </span>
          )}
        </Card>

        <Card className="divide-y divide-white/[0.06] overflow-hidden">
          {[
            { to: "/dashboard", icon: FileText, label: "My projects" },
            { to: "/reviews", icon: Star, label: "Reviews" },
            {
              to: "/pricing",
              icon: CreditCard,
              label: active ? `Plan: ${active.plan} (${active.billing})` : "Choose a plan",
            },
            ...(isAdmin ? [{ to: "/admin", icon: ShieldCheck, label: "Editor studio" }] : []),
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 px-5 py-4 text-sm text-gray-200 hover:bg-white/[0.03] active:bg-white/[0.05]"
            >
              <Icon className="h-4 w-4 text-gray-500" />
              <span className="flex-1">{label}</span>
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </Link>
          ))}
        </Card>

        <Card className="p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-white">Profile</h2>
          <form onSubmit={save} className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="fn">
                Full name
              </label>
              <input
                id="fn"
                className={inputClass}
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="co">
                  Brand / company
                </label>
                <input
                  id="co"
                  className={inputClass}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ph">
                  Phone
                </label>
                <input
                  id="ph"
                  type="tel"
                  inputMode="tel"
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" disabled={busy} className={primaryBtn}>
              {busy && <Spinner className="h-4 w-4 border-t-white" />} Save changes
            </button>
          </form>
        </Card>

        {subs.length > 0 && (
          <Card className="p-5">
            <h2 className="mb-3 text-[15px] font-semibold text-white">Billing history</h2>
            <ul className="divide-y divide-white/[0.06] text-sm">
              {subs.map((s) => (
                <li key={s.reference} className="flex items-center justify-between py-3">
                  <span className="text-gray-200">
                    {s.plan} · {s.billing}
                  </span>
                  <span className="text-gray-500">
                    ${s.amount} · {formatDate(s.paid_at)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <Card className={`p-5 ${reset ? "border-[#f0514e]/40" : ""}`}>
          <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-white">
            <Shield className="h-4 w-4 text-gray-500" />{" "}
            {reset ? "Set a new password" : "Change password"}
          </h2>
          <form onSubmit={changePassword} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="password"
              minLength={8}
              required
              autoComplete="new-password"
              className={inputClass}
              placeholder="New password (8+ characters)"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <button type="submit" className={`${primaryBtn} shrink-0`}>
              Update
            </button>
          </form>
        </Card>

        <button
          onClick={async () => {
            await signOut();
            void navigate({ to: "/" });
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.07] py-4 text-sm font-medium text-red-400 hover:bg-red-500/5"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </AppShell>
  );
}
