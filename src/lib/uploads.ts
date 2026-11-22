import { SUPABASE_ANON_KEY, SUPABASE_URL, supabase } from "./supabase";

/** Make a storage-safe object name while keeping the extension readable. */
export function safeFileName(name: string) {
  const dot = name.lastIndexOf(".");
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
  const ext =
    dot > 0
      ? name
          .slice(dot + 1)
          .replace(/[^\w]/g, "")
          .slice(0, 10)
      : "";
  return `${Date.now()}-${base || "file"}${ext ? "." + ext : ""}`;
}

/**
 * Upload a file straight to Supabase Storage with progress events.
 * supabase-js' upload() has no progress callback, so this talks to the Storage REST API via XHR.
 */
export async function uploadWithProgress(
  bucket: string,
  path: string,
  file: File,
  onProgress: (fraction: number) => void,
  signal?: AbortSignal,
): Promise<void> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("You need to be signed in to upload.");

  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const url = `${SUPABASE_URL}/storage/v1/object/${bucket}/${encodedPath}`;

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("apikey", SUPABASE_ANON_KEY);
    xhr.setRequestHeader("x-upsert", "false");
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(e.loaded / e.total);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(1);
        resolve();
        return;
      }
      let message = `Upload failed (${xhr.status})`;
      try {
        const body = JSON.parse(xhr.responseText);
        message = body.message || body.error || message;
      } catch {
        /* keep default */
      }
      if (xhr.status === 413 || /maximum allowed size|too large/i.test(message)) {
        message = `${file.name} is larger than your storage upload limit. Paste a Google Drive / Dropbox / WeTransfer link instead.`;
      }
      reject(new Error(message));
    };
    xhr.onerror = () => reject(new Error("Network error while uploading."));
    xhr.onabort = () => reject(new DOMException("Upload cancelled", "AbortError"));
    signal?.addEventListener("abort", () => xhr.abort());
    xhr.send(file);
  });
}

/** Short-lived signed URL for downloading a private file. */
export async function signedUrl(bucket: string, path: string, download?: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, 60 * 60, download ? { download } : undefined);
  if (error) throw error;
  return data.signedUrl;
}

/**
 * Upload picked files for a project and register them in project_files.
 * Runs sequentially so mobile connections aren't saturated. Returns how many failed.
 */
export async function uploadProjectFiles(opts: {
  projectId: string;
  customerId: string;
  uploaderId: string;
  kind: "raw" | "deliverable";
  files: { id: string; file: File }[];
  onUpdate: (id: string, patch: { progress?: number; error?: string; done?: boolean }) => void;
}) {
  const bucket = opts.kind === "raw" ? "raw-footage" : "deliverables";
  let failed = 0;
  for (const { id, file } of opts.files) {
    const path = `${opts.customerId}/${opts.projectId}/${safeFileName(file.name)}`;
    try {
      await uploadWithProgress(bucket, path, file, (p) => opts.onUpdate(id, { progress: p }));
      const { error } = await supabase.from("project_files").insert({
        project_id: opts.projectId,
        uploaded_by: opts.uploaderId,
        kind: opts.kind,
        bucket,
        path,
        file_name: file.name,
        size_bytes: file.size,
        mime_type: file.type || null,
      });
      if (error) throw error;
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
