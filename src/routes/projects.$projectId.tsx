import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  CalendarDays,
  CheckCircle2,
  Download,
  FileVideo,
  Link2,
  MessageSquare,
  RotateCcw,
  Send,
  ShieldCheck,
  Star,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import {
  supabase,
  type Project,
  type ProjectFile,
  type ProjectMessage,
  type ProjectStatus,
} from "@/lib/supabase";
import {
  formatBytes,
  formatDate,
  labelFor,
  PLATFORMS,
  STATUS_META,
  VIDEO_TYPES,
} from "@/lib/project-meta";
import { signedUrl, uploadProjectFiles } from "@/lib/uploads";
import { AppShell, Card, PageLoader, Spinner } from "@/components/app/AppShell";
import { RequireAuth } from "@/components/app/RequireAuth";
import { FilePicker, type PickedFile } from "@/components/app/FilePicker";
import {
  ghostBtn,
  inputClass,
  labelClass,
  primaryBtn,
  StatusBadge,
  StatusTimeline,
} from "@/components/app/bits";

export const Route = createFileRoute("/projects/$projectId")({
  head: () => ({ meta: [{ title: "Project — Postpidia" }] }),
  component: () => (
    <RequireAuth>
      <ProjectPage />
    </RequireAuth>
  ),
});

function ProjectPage() {
  const { projectId } = Route.useParams();
  const { user, isAdmin } = useAuth();
  const [project, setProject] = useState<Project | null | undefined>(undefined);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [messages, setMessages] = useState<ProjectMessage[]>([]);
  const [hasReview, setHasReview] = useState(false);

  const load = useCallback(async () => {
    const [p, f, m, r] = await Promise.all([
      supabase.from("projects").select("*").eq("id", projectId).maybeSingle(),
      supabase.from("project_files").select("*").eq("project_id", projectId).order("created_at"),
      supabase.from("project_messages").select("*").eq("project_id", projectId).order("created_at"),
      supabase.from("reviews").select("id").eq("project_id", projectId).limit(1),
    ]);
    setProject((p.data as Project | null) ?? null);
    setFiles((f.data as ProjectFile[]) ?? []);
    setMessages((m.data as ProjectMessage[]) ?? []);
    setHasReview((r.data?.length ?? 0) > 0);
  }, [projectId]);

  useEffect(() => {
    void load();
  }, [load]);

  if (project === undefined)
    return (
      <AppShell title="Project">
        <PageLoader />
      </AppShell>
    );
  if (project === null)
    return (
      <AppShell title="Project not found" back={{ to: "/dashboard", label: "My projects" }}>
        <Card className="p-8 text-center text-sm text-gray-400">
          This project doesn't exist or you don't have access to it.
        </Card>
      </AppShell>
    );

  const raw = files.filter((f) => f.kind === "raw");
  const deliverables = files.filter((f) => f.kind === "deliverable");
  const isOwner = project.customer_id === user?.id;
  const open = !["completed", "cancelled"].includes(project.status);

  const setStatus = async (status: ProjectStatus, note?: string) => {
    const { error } = await supabase.from("projects").update({ status }).eq("id", project.id);
    if (error) return toast.error(error.message);
    if (note)
      await supabase.from("project_messages").insert({ project_id: project.id, body: note });
    toast.success(`Project marked as ${STATUS_META[status].label.toLowerCase()}.`);
    void load();
  };

  return (
    <AppShell
      title={project.title}
      back={
        isAdmin && !isOwner
          ? { to: "/admin", label: "Studio" }
          : { to: "/dashboard", label: "My projects" }
      }
      wide
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_360px] lg:gap-6">
        <div className="space-y-4 min-w-0">
          {/* Status */}
          <Card className="p-4 md:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <StatusBadge status={project.status} />
              <span className="text-xs text-gray-500">
                Updated {formatDate(project.updated_at)}
              </span>
            </div>
            <StatusTimeline status={project.status} />
            {project.editor_notes && (
              <div className="mt-5 rounded-xl border border-[#DF8885]/20 bg-[#DF8885]/[0.07] p-3.5 text-sm text-gray-300">
                <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#DF8885]">
                  Note from your editor
                </span>
                {project.editor_notes}
              </div>
            )}
          </Card>

          {/* Deliverables */}
          {(deliverables.length > 0 || isAdmin) && (
            <Card className="p-4 md:p-6">
              <h2 className="mb-4 text-[15px] font-semibold text-white">Your edited videos</h2>
              {deliverables.length === 0 ? (
                <p className="text-sm text-gray-500">No deliverables uploaded yet.</p>
              ) : (
                <FileList files={deliverables} accent />
              )}

              {isOwner && project.status === "delivered" && (
                <DeliveredActions
                  onApprove={() => setStatus("completed")}
                  onRevise={(note) => setStatus("revision_requested", `Revision request: ${note}`)}
                />
              )}
              {isOwner && project.status === "completed" && !hasReview && (
                <Link
                  to="/reviews"
                  search={{ project: project.id }}
                  className="mt-5 flex items-center gap-3 rounded-xl border border-[#ffb300]/25 bg-[#ffb300]/[0.08] p-4 transition-colors hover:bg-[#ffb300]/[0.12]"
                >
                  <Star className="h-5 w-5 shrink-0 fill-[#ffb300] text-[#ffb300]" />
                  <span className="text-sm text-gray-200">
                    <span className="font-semibold text-white">Happy with the edit?</span> Leave a
                    review — it helps other brands find us.
                  </span>
                </Link>
              )}
            </Card>
          )}

          {/* Raw footage */}
          <Card className="p-4 md:p-6">
            <h2 className="mb-4 text-[15px] font-semibold text-white">Raw footage</h2>
            {project.footage_link && (
              <a
                href={project.footage_link}
                target="_blank"
                rel="noreferrer noopener"
                className="mb-3 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#141414] p-3 text-sm text-sky-300 hover:bg-[#181818]"
              >
                <Link2 className="h-4 w-4 shrink-0" />
                <span className="truncate">{project.footage_link}</span>
              </a>
            )}
            {raw.length === 0 && !project.footage_link ? (
              <p className="text-sm text-gray-500">No files yet.</p>
            ) : (
              <FileList
                files={raw}
                onDeleted={load}
                canDelete={isAdmin || (isOwner && project.status === "submitted")}
              />
            )}
            {isOwner && open && <AddFiles project={project} kind="raw" onDone={load} />}
          </Card>

          {/* Messages */}
          <Messages project={project} messages={messages} onSent={load} />
        </div>

        <div className="space-y-4">
          {isAdmin && <EditorPanel project={project} onSaved={load} />}

          <Card className="p-4 md:p-6">
            <h2 className="mb-4 text-[15px] font-semibold text-white">Brief</h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
              <Detail label="Platform" value={labelFor(PLATFORMS, project.platform)} />
              <Detail label="Style" value={labelFor(VIDEO_TYPES, project.video_type)} />
              <Detail label="Aspect ratio" value={project.aspect_ratio} />
              <Detail label="Length" value={project.target_length || "Flexible"} />
              <Detail label="Submitted" value={formatDate(project.created_at)} />
              <Detail
                label="Needed by"
                value={
                  project.deadline ? (
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(project.deadline)}
                    </span>
                  ) : (
                    "Flexible"
                  )
                }
              />
            </dl>
            {project.style_notes && <Block label="Style notes" text={project.style_notes} />}
            {project.music_preference && (
              <Block label="Music / voiceover" text={project.music_preference} />
            )}

            {isOwner && project.status === "submitted" && (
              <button
                onClick={() => {
                  if (confirm("Cancel this project? Our editors haven't started yet."))
                    void setStatus("cancelled");
                }}
                className="mt-6 text-xs text-gray-500 hover:text-red-400"
              >
                Cancel project
              </button>
            )}
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-gray-500">{label}</dt>
      <dd className="mt-0.5 text-gray-200">{value}</dd>
    </div>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div className="mt-5">
      <div className="text-[11px] uppercase tracking-wider text-gray-500">{label}</div>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">{text}</p>
    </div>
  );
}

function FileList({
  files,
  accent,
  canDelete,
  onDeleted,
}: {
  files: ProjectFile[];
  accent?: boolean;
  canDelete?: boolean;
  onDeleted?: () => void;
}) {
  const [busy, setBusy] = useState<string | null>(null);

  const download = async (f: ProjectFile) => {
    setBusy(f.id);
    try {
      window.open(await signedUrl(f.bucket, f.path, f.file_name), "_blank", "noopener");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create download link.");
    } finally {
      setBusy(null);
    }
  };

  const remove = async (f: ProjectFile) => {
    if (!confirm(`Delete ${f.file_name}?`)) return;
    setBusy(f.id);
    await supabase.storage.from(f.bucket).remove([f.path]);
    const { error } = await supabase.from("project_files").delete().eq("id", f.id);
    setBusy(null);
    if (error) toast.error(error.message);
    onDeleted?.();
  };

  return (
    <ul className="space-y-2">
      {files.map((f) => (
        <li
          key={f.id}
          className={`flex items-center gap-3 rounded-xl border p-3 ${accent ? "border-[#00d084]/20 bg-[#00d084]/[0.06]" : "border-white/[0.07] bg-[#141414]"}`}
        >
          <FileVideo
            className={`h-5 w-5 shrink-0 ${accent ? "text-[#00d084]" : "text-gray-500"}`}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-gray-200">{f.file_name}</p>
            <p className="text-[11px] text-gray-500">
              {formatBytes(f.size_bytes)} · {formatDate(f.created_at)}
            </p>
          </div>
          {canDelete && (
            <button
              onClick={() => void remove(f)}
              disabled={busy === f.id}
              className="rounded-full p-2 text-gray-500 hover:bg-white/5 hover:text-red-400"
              aria-label={`Delete ${f.file_name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => void download(f)}
            disabled={busy === f.id}
            className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold ${accent ? "bg-[#00d084] text-black" : "bg-white/10 text-white"} hover:opacity-90`}
          >
            {busy === f.id ? (
              <Spinner className="h-3.5 w-3.5" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">Download</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function AddFiles({
  project,
  kind,
  onDone,
}: {
  project: Project;
  kind: "raw" | "deliverable";
  onDone: () => void;
}) {
  const { user } = useAuth();
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [busy, setBusy] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);

  const upload = async () => {
    if (!user) return;
    setBusy(true);
    const failed = await uploadProjectFiles({
      projectId: project.id,
      customerId: project.customer_id,
      uploaderId: user.id,
      kind,
      files: files.filter((f) => !f.done),
      onUpdate: (id, patch) =>
        setFiles((l) => l.map((f) => (f.id === id ? { ...f, ...patch } : f))),
    });
    setBusy(false);
    if (failed === 0) {
      toast.success(kind === "raw" ? "Footage added." : "Deliverables uploaded.");
      setFiles([]);
      setOpenPicker(false);
    }
    onDone();
  };

  if (!openPicker)
    return (
      <button onClick={() => setOpenPicker(true)} className={`${ghostBtn} mt-4 w-full sm:w-auto`}>
        + {kind === "raw" ? "Add more footage" : "Upload edited videos"}
      </button>
    );

  return (
    <div className="mt-4">
      <FilePicker files={files} onChange={setFiles} disabled={busy} />
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => void upload()}
          disabled={busy || files.every((f) => f.done)}
          className={`${primaryBtn} flex-1 sm:flex-none`}
        >
          {busy && <Spinner className="h-4 w-4 border-t-white" />} Upload{" "}
          {files.filter((f) => !f.done).length || ""}
        </button>
        <button
          onClick={() => {
            setFiles([]);
            setOpenPicker(false);
          }}
          disabled={busy}
          className={ghostBtn}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function DeliveredActions({
  onApprove,
  onRevise,
}: {
  onApprove: () => void;
  onRevise: (note: string) => void;
}) {
  const [revising, setRevising] = useState(false);
  const [note, setNote] = useState("");
  return (
    <div className="mt-5 border-t border-white/[0.07] pt-5">
      {revising ? (
        <div className="space-y-3">
          <label className={labelClass} htmlFor="rev">
            What should we change?
          </label>
          <textarea
            id="rev"
            rows={3}
            className={`${inputClass} resize-none`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Make the hook faster, swap the music at 0:12, bigger captions…"
          />
          <div className="flex gap-2">
            <button
              disabled={!note.trim()}
              onClick={() => onRevise(note.trim())}
              className={`${primaryBtn} flex-1 sm:flex-none`}
            >
              <RotateCcw className="h-4 w-4" /> Send revision request
            </button>
            <button onClick={() => setRevising(false)} className={ghostBtn}>
              Back
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={onApprove}
            className={`${primaryBtn} bg-[#00d084] text-black shadow-[#00d084]/20`}
          >
            <CheckCircle2 className="h-4 w-4" /> Approve & complete
          </button>
          <button onClick={() => setRevising(true)} className={ghostBtn}>
            <RotateCcw className="h-4 w-4" /> Request a revision
          </button>
        </div>
      )}
    </div>
  );
}

function Messages({
  project,
  messages,
  onSent,
}: {
  project: Project;
  messages: ProjectMessage[];
  onSent: () => void;
}) {
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Scroll only the thread, never the page.
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages.length]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    const { error } = await supabase
      .from("project_messages")
      .insert({ project_id: project.id, body: body.trim() });
    setBusy(false);
    if (error) return toast.error(error.message);
    setBody("");
    onSent();
  };

  return (
    <Card className="p-4 md:p-6">
      <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-white">
        <MessageSquare className="h-4 w-4 text-gray-500" /> Messages
      </h2>
      {messages.length === 0 ? (
        <p className="mb-4 text-sm text-gray-500">
          Questions about the edit? Message your editor here.
        </p>
      ) : (
        <ul ref={listRef} className="mb-4 max-h-[420px] space-y-3 overflow-y-auto pr-1">
          {messages.map((m) => (
            <li key={m.id} className={`flex ${m.from_editor ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${m.from_editor ? "rounded-bl-md bg-white/[0.06] text-gray-200" : "rounded-br-md bg-[#f0514e] text-white"}`}
              >
                {m.from_editor && (
                  <span className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#DF8885]">
                    <ShieldCheck className="h-3 w-3" /> Postpidia editor
                  </span>
                )}
                <p className="whitespace-pre-wrap text-[inherit]">{m.body}</p>
                <span
                  className={`mt-1 block text-[10px] ${m.from_editor ? "text-gray-500" : "text-white/70"}`}
                >
                  {new Date(m.created_at).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={send} className="flex items-end gap-2">
        <textarea
          rows={1}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a message…"
          maxLength={4000}
          className={`${inputClass} min-h-[48px] resize-none`}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send(e);
            }
          }}
        />
        <button
          type="submit"
          disabled={busy || !body.trim()}
          aria-label="Send message"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0514e] text-white disabled:opacity-40"
        >
          {busy ? <Spinner className="h-4 w-4 border-t-white" /> : <Send className="h-4 w-4" />}
        </button>
      </form>
    </Card>
  );
}

function EditorPanel({ project, onSaved }: { project: Project; onSaved: () => void }) {
  const [status, setStatus] = useState<ProjectStatus>(project.status);
  const [notes, setNotes] = useState(project.editor_notes ?? "");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setStatus(project.status);
    setNotes(project.editor_notes ?? "");
  }, [project.status, project.editor_notes]);

  const save = async () => {
    setBusy(true);
    const { error } = await supabase
      .from("projects")
      .update({ status, editor_notes: notes.trim() || null })
      .eq("id", project.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Project updated.");
    onSaved();
  };

  return (
    <Card className="border-[#DF8885]/25 p-4 md:p-6">
      <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-white">
        <ShieldCheck className="h-4 w-4 text-[#DF8885]" /> Editor controls
      </h2>
      <div className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="st">
            Status
          </label>
          <select
            id="st"
            className={inputClass}
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
          >
            {(Object.keys(STATUS_META) as ProjectStatus[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="en">
            Note to customer
          </label>
          <textarea
            id="en"
            rows={3}
            className={`${inputClass} resize-none`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button onClick={() => void save()} disabled={busy} className={`${primaryBtn} w-full`}>
          {busy && <Spinner className="h-4 w-4 border-t-white" />} Save
        </button>
        <div className="border-t border-white/[0.07] pt-4">
          <p className="text-xs text-gray-500">
            Upload finished edits, then set status to “Delivered”.
          </p>
          <AddFiles project={project} kind="deliverable" onDone={onSaved} />
        </div>
      </div>
    </Card>
  );
}
