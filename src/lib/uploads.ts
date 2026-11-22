import type { ProjectFile } from "./types";

/** URL for downloading (or, with inline, streaming/previewing) a stored file. */
export function fileUrl(fileId: string, inline = false) {
  return `/api/files/${fileId}${inline ? "?inline=1" : ""}`;
}

/**
 * Upload one file to /api/upload with progress events. The body is the raw file, which the
 * server streams to disk, so large videos don't need to fit in memory.
 */
export function uploadWithProgress(
  projectId: string,
  kind: "raw" | "deliverable",
  file: File,
  onProgress: (fraction: number) => void,
  signal?: AbortSignal,
): Promise<ProjectFile> {
  const qs = new URLSearchParams({ projectId, kind, name: file.name });
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/upload?${qs}`);
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(e.loaded / e.total);
    };
    xhr.onload = () => {
      let body: { error?: string } & Partial<ProjectFile> = {};
      try {
        body = JSON.parse(xhr.responseText);
      } catch {
        /* non-JSON (e.g. proxy error page) */
      }
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(1);
        resolve(body as ProjectFile);
      } else if (xhr.status === 413) {
        reject(new Error(body.error || `${file.name} is too large for the server's upload limit.`));
      } else {
        reject(new Error(body.error || `Upload failed (${xhr.status}).`));
      }
    };
    xhr.onerror = () => reject(new Error("Network error while uploading."));
    xhr.onabort = () => reject(new DOMException("Upload cancelled", "AbortError"));
    signal?.addEventListener("abort", () => xhr.abort());
    xhr.send(file);
  });
}

/** Upload picked files one after another. Returns how many failed. */
export async function uploadProjectFiles(opts: {
  projectId: string;
  kind: "raw" | "deliverable";
  files: { id: string; file: File }[];
  onUpdate: (id: string, patch: { progress?: number; error?: string; done?: boolean }) => void;
}) {
  let failed = 0;
  for (const { id, file } of opts.files) {
    try {
      await uploadWithProgress(opts.projectId, opts.kind, file, (p) =>
        opts.onUpdate(id, { progress: p }),
      );
      opts.onUpdate(id, { done: true, progress: 1 });
    } catch (err) {
      failed++;
      opts.onUpdate(id, {
        error: err instanceof Error ? err.message : "Upload failed",
        progress: 0,
      });
    }
  }
  return failed;
}
