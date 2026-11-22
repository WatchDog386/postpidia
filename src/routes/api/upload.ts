import { createFileRoute } from "@tanstack/react-router";
import type { ProjectFile } from "@/lib/types";
import { db } from "@/server/db.server";
import { HttpError, SESSION_COOKIE, userFromToken } from "@/server/auth.server";
import { loadProjectFor } from "@/server/access.server";
import { newStorageKey, removeFile, saveStream, TooLargeError } from "@/server/storage.server";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

function readCookie(request: Request, name: string) {
  const header = request.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return null;
}

/**
 * POST /api/upload?projectId=…&kind=raw|deliverable&name=<file name>
 * Body: the raw file bytes (streamed straight to disk, so multi-GB videos are fine).
 */
export const Route = createFileRoute("/api/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Same-origin only (the session cookie is SameSite=Lax, this is a second guard).
        const origin = request.headers.get("origin");
        if (origin && new URL(origin).host !== new URL(request.url).host) {
          return json({ error: "Cross-site upload rejected." }, 403);
        }

        const user = await userFromToken(readCookie(request, SESSION_COOKIE));
        if (!user) return json({ error: "Please sign in to upload." }, 401);

        const url = new URL(request.url);
        const projectId = url.searchParams.get("projectId") ?? "";
        const kind = url.searchParams.get("kind");
        const fileName = (url.searchParams.get("name") ?? "").trim().slice(0, 255) || "upload";
        if (!/^[0-9a-f-]{36}$/i.test(projectId) || (kind !== "raw" && kind !== "deliverable")) {
          return json({ error: "Invalid upload request." }, 400);
        }
        if (!request.body) return json({ error: "Empty upload." }, 400);

        let key: string | null = null;
        try {
          const project = await loadProjectFor(user, projectId);
          if (kind === "deliverable" && user.role !== "admin") {
            return json({ error: "Only editors can upload deliverables." }, 403);
          }
          if (
            kind === "raw" &&
            user.role !== "admin" &&
            ["completed", "cancelled"].includes(project.status)
          ) {
            return json({ error: "This project is closed." }, 403);
          }

          key = newStorageKey(project.id, kind, fileName);
          const size = await saveStream(request.body, key);
          const mime =
            (request.headers.get("content-type") || "").split(";")[0].slice(0, 120) || null;

          const [file] = await db()<ProjectFile[]>`
            insert into project_files (project_id, uploaded_by, kind, storage_key, file_name, size_bytes, mime_type)
            values (${project.id}, ${user.id}, ${kind}, ${key}, ${fileName}, ${size}, ${mime})
            returning id, project_id, uploaded_by, kind, file_name, size_bytes, mime_type, created_at
          `;
          return json(file, 201);
        } catch (err) {
          if (key) await removeFile(key);
          if (err instanceof HttpError) return json({ error: err.message }, err.status);
          if (err instanceof TooLargeError) return json({ error: err.message }, 413);
          console.error("Upload failed:", err);
          return json({ error: "Upload failed. Please try again." }, 500);
        }
      },
    },
  },
});
