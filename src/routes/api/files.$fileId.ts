import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/server/db.server";
import { HttpError, SESSION_COOKIE, userFromToken } from "@/server/auth.server";
import { loadProjectFor } from "@/server/access.server";
import { fileSize, readStream } from "@/server/storage.server";

function readCookie(request: Request, name: string) {
  const header = request.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return null;
}

/**
 * GET /api/files/:fileId          → download (Content-Disposition: attachment)
 * GET /api/files/:fileId?inline=1 → stream for <video> playback (supports Range requests)
 */
export const Route = createFileRoute("/api/files/$fileId")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const user = await userFromToken(readCookie(request, SESSION_COOKIE));
        if (!user) return new Response("Please sign in.", { status: 401 });
        if (!/^[0-9a-f-]{36}$/i.test(params.fileId))
          return new Response("Not found", { status: 404 });

        const [file] = await db()<
          { project_id: string; storage_key: string; file_name: string; mime_type: string | null }[]
        >`select project_id, storage_key, file_name, mime_type from project_files where id = ${params.fileId}`;
        if (!file) return new Response("Not found", { status: 404 });

        try {
          await loadProjectFor(user, file.project_id);
        } catch (err) {
          if (err instanceof HttpError) return new Response(err.message, { status: err.status });
          throw err;
        }

        let size: number;
        try {
          size = await fileSize(file.storage_key);
        } catch {
          return new Response("File is missing from storage.", { status: 410 });
        }

        const inline = new URL(request.url).searchParams.has("inline");
        const encoded = encodeURIComponent(file.file_name);
        const headers: Record<string, string> = {
          "content-type": file.mime_type || "application/octet-stream",
          "accept-ranges": "bytes",
          "cache-control": "private, max-age=3600",
          "x-content-type-options": "nosniff",
          "content-disposition": `${inline ? "inline" : "attachment"}; filename*=UTF-8''${encoded}`,
        };

        const range = request.headers.get("range")?.match(/^bytes=(\d*)-(\d*)$/);
        if (range && size > 0) {
          let start = range[1] ? Number(range[1]) : size - Number(range[2]);
          let end = range[1] && range[2] ? Number(range[2]) : size - 1;
          start = Math.max(0, start);
          end = Math.min(end, size - 1);
          if (start > end) {
            return new Response(null, {
              status: 416,
              headers: { "content-range": `bytes */${size}` },
            });
          }
          return new Response(readStream(file.storage_key, { start, end }), {
            status: 206,
            headers: {
              ...headers,
              "content-range": `bytes ${start}-${end}/${size}`,
              "content-length": String(end - start + 1),
            },
          });
        }

        return new Response(readStream(file.storage_key), {
          headers: { ...headers, "content-length": String(size) },
        });
      },
    },
  },
});
