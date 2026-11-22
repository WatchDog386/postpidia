import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Clapperboard, Clock, Film, Plus, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase, type Project } from "@/lib/supabase";
import { formatDate, labelFor, PLATFORMS } from "@/lib/project-meta";
import { AppShell, Card, PageLoader } from "@/components/app/AppShell";
import { RequireAuth } from "@/components/app/RequireAuth";
import { primaryBtn, StatusBadge } from "@/components/app/bits";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "My Projects — Postpidia" }] }),
  component: () => (
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  ),
});

type Row = Project & { project_files: { count: number }[] };

const FILTERS = [
  {
    key: "active",
    label: "Active",
    match: (p: Project) =>
      ["submitted", "in_review", "editing", "revision_requested"].includes(p.status),
  },
  { key: "ready", label: "Ready", match: (p: Project) => p.status === "delivered" },
  {
    key: "done",
    label: "Done",
    match: (p: Project) => ["completed", "cancelled"].includes(p.status),
  },
  { key: "all", label: "All", match: () => true },
] as const;

function Dashboard() {
  const { user, profile } = useAuth();
  const [projects, setProjects] = useState<Row[] | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("projects")
      .select("*, project_files(count)")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setProjects((data as Row[]) ?? []));
  }, [user]);

  const firstName = (profile?.full_name || "").split(" ")[0];
  const counts = {
    active: projects?.filter(FILTERS[0].match).length ?? 0,
    ready: projects?.filter(FILTERS[1].match).length ?? 0,
    done: projects?.filter((p) => p.status === "completed").length ?? 0,
  };
  const visible = projects?.filter(FILTERS.find((f) => f.key === filter)!.match) ?? [];

  return (
    <AppShell
      title="My Projects"
      subtitle={
        firstName
          ? `Hi ${firstName} — here's what's on the edit bay.`
          : "Everything you've sent to our editors."
      }
      wide
      actions={
        <div className="hidden md:block">
          <Link to="/upload" className={primaryBtn}>
            <Plus className="h-4 w-4" /> New project
          </Link>
        </div>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {[
          { label: "In progress", value: counts.active, icon: Clock, tint: "from-amber-500/20" },
          {
            label: "Ready to review",
            value: counts.ready,
            icon: Sparkles,
            tint: "from-[#00d084]/20",
          },
          { label: "Completed", value: counts.done, icon: Film, tint: "from-[#f0514e]/20" },
        ].map(({ label, value, icon: Icon, tint }) => (
          <Card key={label} className={`bg-gradient-to-br ${tint} to-[#1a1a1a] p-3.5 md:p-5`}>
            <Icon className="h-4 w-4 text-gray-400 md:h-5 md:w-5" />
            <div className="mt-3 text-2xl font-light text-white md:text-3xl">
              {projects ? value : "–"}
            </div>
            <div className="mt-0.5 text-[11px] leading-tight text-gray-400 md:text-xs">{label}</div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
              filter === f.key ? "bg-white text-black" : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-4">
        {projects === null ? (
          <PageLoader />
        ) : visible.length === 0 ? (
          <Card className="flex flex-col items-center px-6 py-14 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0514e]/15">
              <Clapperboard className="h-6 w-6 text-[#f0514e]" />
            </span>
            <h2 className="mt-5 text-lg font-semibold text-white">
              {projects.length === 0 ? "Send us your first footage" : "Nothing here yet"}
            </h2>
            <p className="mt-2 max-w-xs text-sm text-gray-400">
              Upload raw clips, tell us the vibe, and our editors turn them into platform-ready
              videos.
            </p>
            <Link to="/upload" className={`${primaryBtn} mt-6`}>
              <Plus className="h-4 w-4" /> Start a project
            </Link>
          </Card>
        ) : (
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {visible.map((p) => (
              <li key={p.id} className="min-w-0">
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: p.id }}
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#1a1a1a] p-4 transition-colors hover:border-white/15 active:bg-[#202020]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b0000] to-black">
                    <Film className="h-5 w-5 text-white/80" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-[15px] font-semibold text-white">{p.title}</h3>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {labelFor(PLATFORMS, p.platform)} · {p.project_files[0]?.count ?? 0} files ·{" "}
                      {formatDate(p.created_at)}
                    </p>
                    <div className="mt-2">
                      <StatusBadge status={p.status} />
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-gray-600 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
