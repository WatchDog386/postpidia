import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check, ChevronRight, Inbox, Mail, Star, Trash2 } from "lucide-react";
import type { ContactMessage, ProjectListItem, ProjectStatus, Review } from "@/lib/types";
import { adminListProjects } from "@/lib/api/projects";
import {
  adminCounts,
  adminListContacts,
  adminListReviews,
  deleteReview,
  setContactHandled,
  setReviewApproved,
} from "@/lib/api/reviews";
import { errorMessage } from "@/lib/errors";
import { formatDate, labelFor, PLATFORMS, STATUS_META } from "@/lib/project-meta";
import { AppShell, Card, PageLoader } from "@/components/app/AppShell";
import { RequireAuth } from "@/components/app/RequireAuth";
import { StatusBadge, Stars } from "@/components/app/bits";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Editor Studio — Postpidia" }] }),
  component: () => (
    <RequireAuth admin>
      <AdminPage />
    </RequireAuth>
  ),
});

const TABS = [
  { key: "projects", label: "Projects" },
  { key: "reviews", label: "Reviews" },
  { key: "inbox", label: "Inbox" },
] as const;

function AdminPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("projects");
  const [counts, setCounts] = useState({ reviews: 0, inbox: 0 });

  return (
    <AppShell
      title="Editor Studio"
      subtitle="Manage incoming footage, deliveries and reviews."
      wide
    >
      <div className="mb-5 grid grid-cols-3 rounded-full bg-white/5 p-1 text-sm font-medium md:inline-grid md:w-auto">
        {TABS.map((t) => {
          const badge = t.key === "reviews" ? counts.reviews : t.key === "inbox" ? counts.inbox : 0;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center justify-center gap-1.5 rounded-full px-5 py-2 transition-colors ${tab === t.key ? "bg-[#f0514e] text-white" : "text-gray-400"}`}
            >
              {t.label}
              {badge > 0 && (
                <span className="rounded-full bg-white/20 px-1.5 text-[10px]">{badge}</span>
              )}
            </button>
          );
        })}
      </div>
      {tab === "projects" && <ProjectsQueue />}
      {tab === "reviews" && (
        <ReviewQueue onCount={(n) => setCounts((c) => ({ ...c, reviews: n }))} />
      )}
      {tab === "inbox" && <ContactInbox onCount={(n) => setCounts((c) => ({ ...c, inbox: n }))} />}
      {/* Prime badge counts */}
      <BadgeLoader onCounts={setCounts} />
    </AppShell>
  );
}

function BadgeLoader({ onCounts }: { onCounts: (c: { reviews: number; inbox: number }) => void }) {
  useEffect(() => {
    adminCounts()
      .then(onCounts)
      .catch(() => {});
  }, [onCounts]);
  return null;
}

function ProjectsQueue() {
  const [projects, setProjects] = useState<ProjectListItem[] | null>(null);
  const [status, setStatus] = useState<ProjectStatus | "open">("open");

  useEffect(() => {
    setProjects(null);
    adminListProjects({ data: { status } })
      .then(setProjects)
      .catch((err) => {
        toast.error(errorMessage(err));
        setProjects([]);
      });
  }, [status]);

  return (
    <>
      <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
        {(["open", ...Object.keys(STATUS_META)] as (ProjectStatus | "open")[]).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium ${status === s ? "bg-white text-black" : "bg-white/5 text-gray-400"}`}
          >
            {s === "open" ? "Open" : STATUS_META[s].label}
          </button>
        ))}
      </div>
      {projects === null ? (
        <PageLoader />
      ) : projects.length === 0 ? (
        <Card className="p-10 text-center text-sm text-gray-500">Nothing in this queue.</Card>
      ) : (
        <ul className="space-y-2">
          {projects.map((p) => {
            const who = {
              full_name: p.customer_name,
              email: p.customer_email,
              company: p.customer_company,
            };
            const overdue =
              p.deadline &&
              new Date(p.deadline) < new Date() &&
              !["delivered", "completed", "cancelled"].includes(p.status);
            return (
              <li key={p.id}>
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: p.id }}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#1a1a1a] p-4 hover:border-white/15"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-[15px] font-semibold text-white">{p.title}</h3>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {who?.full_name || who?.email || "Customer"}
                      {who?.company ? ` · ${who.company}` : ""} · {labelFor(PLATFORMS, p.platform)}{" "}
                      · {formatDate(p.created_at)}
                      {p.deadline && (
                        <span className={overdue ? "text-red-400" : ""}>
                          {" "}
                          · due {formatDate(p.deadline)}
                        </span>
                      )}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-gray-600" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function ReviewQueue({ onCount }: { onCount: (n: number) => void }) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const load = useCallback(async () => {
    const list = await adminListReviews().catch(() => [] as Review[]);
    setReviews(list);
    onCount(list.filter((r) => !r.approved).length);
  }, [onCount]);
  useEffect(() => void load(), [load]);

  const approve = async (r: Review, approved: boolean) => {
    try {
      await setReviewApproved({ data: { id: r.id, approved } });
    } catch (err) {
      return toast.error(errorMessage(err));
    }
    void load();
  };
  const remove = async (r: Review) => {
    if (!confirm("Delete this review?")) return;
    try {
      await deleteReview({ data: { id: r.id } });
    } catch (err) {
      return toast.error(errorMessage(err));
    }
    void load();
  };

  if (reviews === null) return <PageLoader />;
  if (reviews.length === 0)
    return (
      <Card className="p-10 text-center text-sm text-gray-500">
        <Star className="mx-auto mb-3 h-6 w-6" />
        No reviews yet.
      </Card>
    );
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {reviews.map((r) => (
        <li key={r.id}>
          <Card className={`p-4 ${r.approved ? "" : "border-amber-500/30"}`}>
            <div className="flex items-center justify-between">
              <Stars value={r.rating} />
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${r.approved ? "text-[#00d084]" : "text-amber-300"}`}
              >
                {r.approved ? "Live" : "Pending"}
              </span>
            </div>
            {r.title && <p className="mt-2 font-semibold text-white">{r.title}</p>}
            <p className="mt-1 text-sm text-gray-300">{r.body}</p>
            <p className="mt-2 text-xs text-gray-500">
              {r.display_name}
              {r.company ? ` · ${r.company}` : ""} · {formatDate(r.created_at)}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => void approve(r, !r.approved)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold ${r.approved ? "bg-white/10 text-white" : "bg-[#00d084] text-black"}`}
              >
                <Check className="h-3.5 w-3.5" /> {r.approved ? "Unpublish" : "Approve"}
              </button>
              <button
                onClick={() => void remove(r)}
                className="rounded-full p-2 text-gray-500 hover:text-red-400"
                aria-label="Delete review"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}

function ContactInbox({ onCount }: { onCount: (n: number) => void }) {
  const [msgs, setMsgs] = useState<ContactMessage[] | null>(null);
  const load = useCallback(async () => {
    const list = await adminListContacts().catch(() => [] as ContactMessage[]);
    setMsgs(list);
    onCount(list.filter((m) => !m.handled).length);
  }, [onCount]);
  useEffect(() => void load(), [load]);

  const toggle = async (m: ContactMessage) => {
    await setContactHandled({ data: { id: m.id, handled: !m.handled } }).catch((err) =>
      toast.error(errorMessage(err)),
    );
    void load();
  };

  if (msgs === null) return <PageLoader />;
  if (msgs.length === 0)
    return (
      <Card className="p-10 text-center text-sm text-gray-500">
        <Inbox className="mx-auto mb-3 h-6 w-6" />
        Inbox is empty.
      </Card>
    );
  return (
    <ul className="space-y-3">
      {msgs.map((m) => (
        <li key={m.id}>
          <Card className={`p-4 ${m.handled ? "opacity-60" : ""}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-white">{m.subject || "(no subject)"}</p>
              <span className="text-xs text-gray-500">{formatDate(m.created_at)}</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              {m.name} ·{" "}
              <a className="text-[#f0514e] hover:underline" href={`mailto:${m.email}`}>
                {m.email}
              </a>
              {m.phone ? ` · ${m.phone}` : ""}
            </p>
            <p className="mt-3 whitespace-pre-wrap text-sm text-gray-300">{m.message}</p>
            <div className="mt-3 flex gap-2">
              <a
                href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + (m.subject || "Your message to Postpidia"))}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white"
              >
                <Mail className="h-3.5 w-3.5" /> Reply
              </a>
              <button
                onClick={() => void toggle(m)}
                className="rounded-full px-4 py-2 text-xs text-gray-400 hover:text-white"
              >
                {m.handled ? "Mark unread" : "Mark handled"}
              </button>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
