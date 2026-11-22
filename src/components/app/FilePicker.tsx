import { useRef, useState } from "react";
import { FileVideo, UploadCloud, X } from "lucide-react";
import { formatBytes } from "@/lib/project-meta";

export type PickedFile = {
  id: string;
  file: File;
  progress: number;
  error?: string;
  done?: boolean;
};

const ACCEPT = "video/*,audio/*,image/*,.mov,.mp4,.mkv,.avi,.mxf,.braw,.r3d,.zip,.pdf";

/** Drag-and-drop on desktop, native file picker (camera roll) on mobile. */
export function FilePicker({
  files,
  onChange,
  disabled,
}: {
  files: PickedFile[];
  onChange: (files: PickedFile[]) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  const add = (list: FileList | null) => {
    if (!list) return;
    const next = Array.from(list).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
      file,
      progress: 0,
    }));
    onChange([...files, ...next]);
  };

  const total = files.reduce((n, f) => n + f.file.size, 0);

  return (
    <div>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          if (!disabled) add(e.dataTransfer.files);
        }}
        className={`flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors disabled:opacity-50 ${
          over
            ? "border-[#f0514e] bg-[#f0514e]/10"
            : "border-white/15 bg-[#141414] hover:border-white/25"
        }`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0514e]/15">
          <UploadCloud className="h-7 w-7 text-[#f0514e]" />
        </span>
        <span className="mt-4 text-[15px] font-semibold text-white">
          <span className="md:hidden">Tap to choose footage</span>
          <span className="hidden md:inline">Drop footage here or click to browse</span>
        </span>
        <span className="mt-1 text-xs text-gray-500">
          MP4, MOV, MKV, audio, images, ZIP — multiple files OK
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => {
          add(e.target.files);
          e.target.value = "";
        }}
      />

      {files.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 flex justify-between text-xs text-gray-500">
            <span>
              {files.length} file{files.length > 1 ? "s" : ""}
            </span>
            <span>{formatBytes(total)}</span>
          </div>
          <ul className="space-y-2">
            {files.map((f) => (
              <li
                key={f.id}
                className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#141414] p-3"
              >
                <div
                  className={`absolute inset-y-0 left-0 transition-[width] duration-200 ${f.error ? "bg-red-500/10" : "bg-[#00d084]/10"}`}
                  style={{ width: `${Math.round(f.progress * 100)}%` }}
                  aria-hidden
                />
                <div className="relative flex items-center gap-3">
                  <FileVideo
                    className={`h-5 w-5 shrink-0 ${f.done ? "text-[#00d084]" : "text-gray-500"}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-gray-200">{f.file.name}</p>
                    <p className={`text-[11px] ${f.error ? "text-red-400" : "text-gray-500"}`}>
                      {f.error ??
                        (f.done
                          ? "Uploaded"
                          : f.progress > 0
                            ? `${Math.round(f.progress * 100)}%`
                            : formatBytes(f.file.size))}
                    </p>
                  </div>
                  {!disabled && !f.done && (
                    <button
                      type="button"
                      onClick={() => onChange(files.filter((x) => x.id !== f.id))}
                      className="rounded-full p-1.5 text-gray-500 hover:bg-white/5 hover:text-white"
                      aria-label={`Remove ${f.file.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
