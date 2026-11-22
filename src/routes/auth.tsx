import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Clapperboard, Eye, EyeOff, Film, Sparkles, Upload } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { requestPasswordReset, resetPassword, signIn, signUp } from "@/lib/api/auth";
import { errorMessage } from "@/lib/errors";
import { inputClass, labelClass, primaryBtn } from "@/components/app/bits";
import { Spinner } from "@/components/app/AppShell";

type Mode = "signin" | "signup" | "reset";

export const Route = createFileRoute("/auth")({
  validateSearch: (
    s: Record<string, unknown>,
  ): { mode?: Mode; redirect?: string; token?: string } => ({
    token: typeof s.token === "string" ? s.token : undefined,
    mode: s.mode === "signup" || s.mode === "reset" ? s.mode : undefined,
    redirect: typeof s.redirect === "string" && s.redirect.startsWith("/") ? s.redirect : undefined,
  }),
  head: () => ({ meta: [{ title: "Sign in — Postpidia" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { mode = "signin", redirect, token } = Route.useSearch();
  const settingNew = mode === "reset" && Boolean(token);
  const navigate = useNavigate();
  const { user, loading, setUser } = useAuth();
  const [form, setForm] = useState({ name: "", company: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  useEffect(() => {
    if (!loading && user) void navigate({ to: redirect ?? "/dashboard" });
  }, [loading, user, redirect, navigate]);

  const setMode = (m: Mode) =>
    navigate({ to: "/auth", search: { mode: m, redirect }, replace: true });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const res = await signUp({
          data: {
            email: form.email,
            password: form.password,
            full_name: form.name,
            company: form.company,
          },
        });
        if (!res.ok) return void toast.error(res.error);
        toast.success("Welcome to Postpidia!");
        setUser(res.user);
      } else if (mode === "signin") {
        const res = await signIn({ data: { email: form.email, password: form.password } });
        if (!res.ok) return void toast.error(res.error);
        setUser(res.user);
      } else if (settingNew && token) {
        const res = await resetPassword({ data: { token, password: form.password } });
        if (!res.ok) return void toast.error(res.error);
        toast.success("Password updated — you're signed in.");
        setUser(res.user);
      } else {
        await requestPasswordReset({ data: { email: form.email } });
        setCheckEmail(true);
      }
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const heading =
    mode === "signup"
      ? "Create your account"
      : settingNew
        ? "Choose a new password"
        : mode === "reset"
          ? "Reset your password"
          : "Welcome back";

  return (
    <div className="min-h-screen bg-[#111111] md:grid md:grid-cols-2">
      {/* Brand panel (desktop) */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#8b0000] via-[#2a0a0a] to-black p-12 md:flex md:flex-col md:justify-between">
        <Link to="/">
          <img src="/logo.png" alt="Postpidia" className="h-14 w-auto" />
        </Link>
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-light leading-tight text-white">
            Raw footage in.
            <br />
            <span className="font-semibold text-[#DF8885]">Scroll-stopping videos</span> out.
          </h2>
          <ul className="mt-8 space-y-4 text-sm text-gray-300">
            {[
              { icon: Upload, text: "Upload raw clips straight from your phone or desktop" },
              { icon: Clapperboard, text: "Track every edit from brief to final delivery" },
              { icon: Sparkles, text: "Request revisions and download platform-ready exports" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <Icon className="h-4 w-4 text-white" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <Film className="absolute -bottom-16 -right-16 h-80 w-80 text-white/[0.04]" />
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} Postpidia</p>
      </aside>

      {/* Form */}
      <section
        className="flex min-h-[calc(100vh-4rem)] flex-col px-5 md:min-h-screen md:items-center md:justify-center md:px-12"
        style={{ paddingTop: "max(env(safe-area-inset-top), 1.5rem)" }}
      >
        <Link to="/" className="mb-10 md:hidden">
          <img src="/logo.png" alt="Postpidia" className="h-12 w-auto" />
        </Link>

        <div className="w-full max-w-sm">
          {checkEmail ? (
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-white">Check your inbox</h1>
              <p className="mt-3 text-sm text-gray-400">
                If an account exists for <span className="text-white">{form.email}</span>,
                we&apos;ve sent a link to reset your password. It expires in 1 hour.
              </p>
              <button
                className={`${primaryBtn} mt-8 w-full`}
                onClick={() => {
                  setCheckEmail(false);
                  void setMode("signin");
                }}
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-[28px] font-semibold leading-tight text-white">{heading}</h1>
              <p className="mt-2 text-sm text-gray-400">
                {mode === "signup"
                  ? "Start sending footage to our editors in minutes."
                  : settingNew
                    ? "Enter a new password for your account."
                    : mode === "reset"
                      ? "We'll email you a link to set a new password."
                      : "Sign in to upload footage and follow your edits."}
              </p>

              {mode !== "reset" && (
                <div className="mt-7 grid grid-cols-2 rounded-full bg-white/5 p-1 text-sm font-medium">
                  {(["signin", "signup"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => void setMode(m)}
                      className={`rounded-full py-2 transition-colors ${mode === m ? "bg-[#f0514e] text-white" : "text-gray-400"}`}
                    >
                      {m === "signin" ? "Sign in" : "Create account"}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={submit} className="mt-6 space-y-4">
                {mode === "signup" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="name">
                        Full name
                      </label>
                      <input
                        id="name"
                        required
                        autoComplete="name"
                        className={inputClass}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="company">
                        Brand / company
                      </label>
                      <input
                        id="company"
                        autoComplete="organization"
                        className={inputClass}
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                )}
                {!settingNew && (
                  <div>
                    <label className={labelClass} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@brand.com"
                    />
                  </div>
                )}
                {(mode !== "reset" || settingNew) && (
                  <div>
                    <div className="flex items-center justify-between">
                      <label className={labelClass} htmlFor="password">
                        Password
                      </label>
                      {mode === "signin" && (
                        <button
                          type="button"
                          onClick={() => void setMode("reset")}
                          className="mb-1.5 text-xs text-[#f0514e] hover:underline"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPw ? "text" : "password"}
                        required
                        minLength={8}
                        autoComplete={mode === "signin" ? "current-password" : "new-password"}
                        className={`${inputClass} pr-12`}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder={mode === "signin" ? "••••••••" : "At least 8 characters"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500"
                        aria-label={showPw ? "Hide password" : "Show password"}
                      >
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={busy}
                  className={`${primaryBtn} mt-2 w-full py-3.5`}
                >
                  {busy && <Spinner className="h-4 w-4 border-t-white" />}
                  {mode === "signup"
                    ? "Create account"
                    : settingNew
                      ? "Save new password"
                      : mode === "reset"
                        ? "Send reset link"
                        : "Sign in"}
                </button>
              </form>

              {mode === "reset" && (
                <button
                  onClick={() => void setMode("signin")}
                  className="mt-5 w-full text-center text-sm text-gray-400 hover:text-white"
                >
                  Back to sign in
                </button>
              )}
              <p className="mt-8 text-center text-xs leading-relaxed text-gray-500">
                By continuing you agree to our{" "}
                <Link to="/terms" className="text-gray-300 hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-gray-300 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
