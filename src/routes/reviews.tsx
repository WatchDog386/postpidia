import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Clock, MessageSquareQuote, PenLine } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { isSupabaseConfigured, supabase, type Review } from "@/lib/supabase";
import { formatDate } from "@/lib/project-meta";
import { AppShell, Avatar, Card, PageLoader, Spinner } from "@/components/app/AppShell";
import { inputClass, labelClass, primaryBtn, Stars } from "@/components/app/bits";

export const Route = createFileRoute("/reviews")({
  validateSearch: (s: Record<string, unknown>): { project?: string } => ({
    project: typeof s.project === "string" ? s.project : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Customer Reviews — Postpidia" },
      {
        name: "description",
        content: "What brands and creators say about Postpidia's video editing.",
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { project } = Route.useSearch();
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [mine, setMine] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(Boolean(project));

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) return setReviews([]);
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(100);
    setReviews((data as Review[]) ?? []);
    if (user) {
      const own = await supabase
        .from("reviews")
        .select("*")
        .eq("user_id", user.id)
        .eq("approved", false);
      setMine((own.data as Review[]) ?? []);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  const avg =
    reviews && reviews.length ? reviews.reduce((n, r) => n + r.rating, 0) / reviews.length : 0;
  const dist = [5, 4, 3, 2, 1].map((n) => ({
    n,
    count: reviews?.filter((r) => r.rating === n).length ?? 0,
  }));

  return (
    <AppShell
      title="Reviews"
      subtitle="Honest words from brands we've edited for."
      wide
      actions={
        !showForm && (
          <button onClick={() => setShowForm(true)} className={primaryBtn}>
            <PenLine className="h-4 w-4" /> Write a review
          </button>
        )
      }
    >
      <div className="grid gap-4 lg:grid-cols-[320px_1fr] lg:gap-6">
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-4">
              <div className="text-5xl font-light text-white">
                {reviews?.length ? avg.toFixed(1) : "–"}
              </div>
              <div>
                <Stars value={Math.round(avg)} size={18} />
                <p className="mt-1 text-xs text-gray-500">
                  {reviews?.length ?? 0} review{reviews?.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <ul className="mt-5 space-y-1.5">
              {dist.map(({ n, count }) => (
                <li key={n} className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="w-3">{n}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <span
                      className="block h-full rounded-full bg-[#ffb300]"
                      style={{ width: `${reviews?.length ? (count / reviews.length) * 100 : 0}%` }}
                    />
                  </span>
                  <span className="w-5 text-right">{count}</span>
                </li>
              ))}
            </ul>
          </Card>

          {showForm &&
            (user ? (
              <ReviewForm
                projectId={project}
                onDone={() => {
                  setShowForm(false);
                  void load();
                }}
                onCancel={() => setShowForm(false)}
              />
            ) : (
              <Card className="p-5 text-center">
                <p className="text-sm text-gray-300">Sign in to leave a review.</p>
                <div className="mt-4 flex justify-center gap-2">
                  <Link
                    to="/auth"
                    search={{ mode: "signin", redirect: "/reviews" }}
                    className={primaryBtn}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/auth"
                    search={{ mode: "signup", redirect: "/reviews" }}
                    className="inline-flex items-center rounded-full border border-white/15 px-5 text-sm text-gray-200"
                  >
                    Create account
                  </Link>
                </div>
              </Card>
            ))}

          {mine.length > 0 && (
            <Card className="p-4">
              <p className="flex items-center gap-2 text-xs text-amber-300">
                <Clock className="h-3.5 w-3.5" /> {mine.length} of your reviews{" "}
                {mine.length > 1 ? "are" : "is"} awaiting moderation.
              </p>
            </Card>
          )}
        </div>

        <div>
          {reviews === null ? (
            <PageLoader />
          ) : reviews.length === 0 ? (
            <Card className="flex flex-col items-center px-6 py-14 text-center">
              <MessageSquareQuote className="h-8 w-8 text-gray-600" />
              <p className="mt-4 text-sm text-gray-400">
                No reviews yet — be the first to share your experience.
              </p>
            </Card>
          ) : (
            <ul className="columns-1 gap-4 md:columns-2 [&>li]:mb-4">
              {reviews.map((r) => (
                <li key={r.id} className="break-inside-avoid">
                  <Card className="p-5">
                    <Stars value={r.rating} />
                    {r.title && (
                      <h3 className="mt-3 text-[15px] font-semibold text-white">{r.title}</h3>
                    )}
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
                      {r.body}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <Avatar name={r.display_name} size={32} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{r.display_name}</p>
                        <p className="truncate text-[11px] text-gray-500">
                          {[r.company, formatDate(r.created_at)].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function ReviewForm({
  projectId,
  onDone,
  onCancel,
}: {
  projectId?: string;
  onDone: () => void;
  onCancel: () => void;
}) {
  const { user, profile } = useAuth();
  const [rating, setRating] = useState(5);
  const [form, setForm] = useState({
    display_name: profile?.full_name || "",
    company: profile?.company || "",
    title: "",
    body: "",
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setForm((f) => ({
      ...f,
      display_name: f.display_name || profile?.full_name || "",
      company: f.company || profile?.company || "",
    }));
  }, [profile]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (form.body.trim().length < 10) return toast.error("Please write at least a sentence.");
    setBusy(true);
    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      project_id: projectId ?? null,
      rating,
      display_name: form.display_name.trim(),
      company: form.company.trim() || null,
      title: form.title.trim() || null,
      body: form.body.trim(),
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Thanks! Your review will appear once it's approved.");
    onDone();
  };

  return (
    <Card className="p-5">
      <form onSubmit={submit} className="space-y-4">
        <div>
          <span className={labelClass}>Your rating</span>
          <Stars value={rating} onChange={setRating} size={28} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass} htmlFor="rn">
              Name
            </label>
            <input
              id="rn"
              required
              maxLength={80}
              className={inputClass}
              value={form.display_name}
              onChange={(e) => setForm({ ...form, display_name: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="rc">
              Brand
            </label>
            <input
              id="rc"
              maxLength={80}
              className={inputClass}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Optional"
            />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="rt">
            Headline
          </label>
          <input
            id="rt"
            maxLength={120}
            className={inputClass}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Our TikTok ads finally convert"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="rb">
            Your review
          </label>
          <textarea
            id="rb"
            required
            rows={5}
            minLength={10}
            maxLength={2000}
            className={`${inputClass} resize-none`}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            placeholder="How was the turnaround, the quality, the communication?"
          />
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={busy} className={`${primaryBtn} flex-1`}>
            {busy && <Spinner className="h-4 w-4 border-t-white" />} Submit review
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-4 text-sm text-gray-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
}
