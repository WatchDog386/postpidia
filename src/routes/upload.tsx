import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Link2, Send } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { createProject } from "@/lib/api/projects";
import { errorMessage } from "@/lib/errors";
import { ASPECT_RATIOS, PLATFORMS, VIDEO_TYPES } from "@/lib/project-meta";
import { uploadProjectFiles } from "@/lib/uploads";
import { AppShell, Card, Spinner } from "@/components/app/AppShell";
import { RequireAuth } from "@/components/app/RequireAuth";
import { FilePicker, type PickedFile } from "@/components/app/FilePicker";
import { inputClass, labelClass, primaryBtn } from "@/components/app/bits";

export const Route = createFileRoute("/upload")({
  head: () => ({ meta: [{ title: "Upload Footage — Postpidia" }] }),
  component: () => (
    <RequireAuth>
      <UploadPage />
    </RequireAuth>
  ),
});

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors active:scale-95 ${
        active
          ? "border-[#f0514e] bg-[#f0514e]/15 text-white"
          : "border-white/10 text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <Card className="p-4 md:p-6">
      <h2 className="mb-4 flex items-center gap-3 text-[15px] font-semibold text-white">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f0514e] text-[11px] font-bold">
          {n}
        </span>
        {title}
      </h2>
      {children}
    </Card>
  );
}

function UploadPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [form, setForm] = useState({
    title: "",
    platform: "tiktok",
    video_type: "product-ad",
    aspect_ratio: "9:16",
    target_length: "",
    deadline: "",
    style_notes: "",
    music_preference: "",
    footage_link: "",
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const patchFile = (id: string, patch: Partial<PickedFile>) =>
    setFiles((list) => list.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (files.length === 0 && !form.footage_link.trim()) {
      toast.error("Add at least one file or paste a link to your footage.");
      return;
    }
    setBusy(true);
    let project: { id: string };
    try {
      project = await createProject({
        data: {
          title: form.title.trim(),
          platform: form.platform,
          video_type: form.video_type,
          aspect_ratio: form.aspect_ratio,
          target_length: form.target_length || null,
          deadline: form.deadline || null,
          style_notes: form.style_notes.trim() || null,
          music_preference: form.music_preference.trim() || null,
          footage_link: form.footage_link.trim() || null,
        },
      });
    } catch (err) {
      setBusy(false);
      toast.error(errorMessage(err, "Could not create the project."));
      return;
    }

    const failed = await uploadProjectFiles({
      projectId: project.id,
      kind: "raw",
      files: files.filter((f) => !f.done),
      onUpdate: patchFile,
    });

    setBusy(false);
    if (failed > 0) {
      toast.warning(
        `Project created, but ${failed} file${failed > 1 ? "s" : ""} failed. You can retry from the project page.`,
      );
    } else {
      toast.success("Footage sent! Our editors will review it shortly.");
    }
    void navigate({ to: "/projects/$projectId", params: { projectId: project.id } });
  };

  return (
    <AppShell
      title="New Project"
      subtitle="Tell us what you need and send your raw footage."
      back={{ to: "/dashboard", label: "My projects" }}
    >
      <form onSubmit={submit} className="space-y-4 md:space-y-5">
        <Section n={1} title="Upload raw footage">
          <FilePicker files={files} onChange={setFiles} disabled={busy} />
          <div className="mt-5">
            <label className={labelClass} htmlFor="link">
              Or share a link{" "}
              <span className="text-gray-600">
                (Google Drive, Dropbox, WeTransfer — best for very large files)
              </span>
            </label>
            <div className="relative">
              <Link2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
              <input
                id="link"
                type="url"
                inputMode="url"
                className={`${inputClass} pl-11`}
                placeholder="https://"
                value={form.footage_link}
                onChange={(e) => set("footage_link", e.target.value)}
                disabled={busy}
              />
            </div>
          </div>
        </Section>

        <Section n={2} title="The brief">
          <div className="space-y-5">
            <div>
              <label className={labelClass} htmlFor="title">
                Project name
              </label>
              <input
                id="title"
                required
                maxLength={140}
                className={inputClass}
                placeholder="e.g. Summer serum launch — 3 TikTok ads"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                disabled={busy}
              />
            </div>
            <div>
              <span className={labelClass}>Where will it be posted?</span>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <Chip
                    key={p.value}
                    active={form.platform === p.value}
                    onClick={() => set("platform", p.value)}
                  >
                    {p.label}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <span className={labelClass}>Video style</span>
              <div className="flex flex-wrap gap-2">
                {VIDEO_TYPES.map((p) => (
                  <Chip
                    key={p.value}
                    active={form.video_type === p.value}
                    onClick={() => set("video_type", p.value)}
                  >
                    {p.label}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className={labelClass}>Aspect ratio</span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {ASPECT_RATIOS.map((r) => (
                    <Chip
                      key={r}
                      active={form.aspect_ratio === r}
                      onClick={() => set("aspect_ratio", r)}
                    >
                      {r}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelClass} htmlFor="len">
                    Target length
                  </label>
                  <select
                    id="len"
                    className={inputClass}
                    value={form.target_length}
                    onChange={(e) => set("target_length", e.target.value)}
                    disabled={busy}
                  >
                    <option value="">No preference</option>
                    <option>Under 15s</option>
                    <option>15–30s</option>
                    <option>30–60s</option>
                    <option>1–3 min</option>
                    <option>3+ min</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="deadline">
                Needed by
              </label>
              <input
                id="deadline"
                type="date"
                className={`${inputClass} [color-scheme:dark]`}
                min={new Date().toISOString().slice(0, 10)}
                value={form.deadline}
                onChange={(e) => set("deadline", e.target.value)}
                disabled={busy}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="notes">
                Style notes, hooks, text overlays, references
              </label>
              <textarea
                id="notes"
                rows={5}
                maxLength={4000}
                className={`${inputClass} resize-none`}
                placeholder="Open on the product close-up, fast cuts, captions in brand pink, CTA 'Shop now' at the end…"
                value={form.style_notes}
                onChange={(e) => set("style_notes", e.target.value)}
                disabled={busy}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="music">
                Music / voiceover preference
              </label>
              <input
                id="music"
                className={inputClass}
                placeholder="Upbeat trending audio, no voiceover"
                value={form.music_preference}
                onChange={(e) => set("music_preference", e.target.value)}
                disabled={busy}
              />
            </div>
          </div>
        </Section>

        {/* Sticky submit on mobile, sitting above the tab bar */}
        <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-30 -mx-4 bg-gradient-to-t from-[#111111] via-[#111111] to-transparent px-4 pb-2 pt-6 md:static md:mx-0 md:bg-none md:p-0">
          <button
            type="submit"
            disabled={busy || !form.title.trim()}
            className={`${primaryBtn} w-full py-4 md:w-auto md:px-10`}
          >
            {busy ? <Spinner className="h-4 w-4 border-t-white" /> : <Send className="h-4 w-4" />}
            {busy ? "Uploading…" : "Send to editors"}
          </button>
        </div>
      </form>
    </AppShell>
  );
}
