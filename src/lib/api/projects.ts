import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type {
  Project,
  ProjectFile,
  ProjectListItem,
  ProjectMessage,
  ProjectStatus,
  Subscription,
  User,
} from "@/lib/types";
import { db } from "@/server/db.server";
import { HttpError, requireAdmin, requireUser } from "@/server/auth.server";
import { removeFile } from "@/server/storage.server";
import { loadProjectFor } from "@/server/access.server";
import type { PendingQuery, Row } from "postgres";

const STATUSES = [
  "submitted",
  "in_review",
  "editing",
  "delivered",
  "revision_requested",
  "completed",
  "cancelled",
] as const satisfies readonly ProjectStatus[];

const FILE_COLUMNS =
  "id, project_id, uploaded_by, kind, file_name, size_bytes, mime_type, created_at";

const listSelect = (where: PendingQuery<Row[]>) => db()<ProjectListItem[]>`
  select p.*,
         (select count(*)::int from project_files f where f.project_id = p.id) as file_count,
         u.full_name as customer_name, u.email as customer_email, u.company as customer_company
  from projects p join users u on u.id = p.customer_id
  ${where}
  order by p.created_at desc
  limit 300
`;

export const listMyProjects = createServerFn({ method: "GET" }).handler(async () => {
  const me = await requireUser();
  return listSelect(db()`where p.customer_id = ${me.id}`);
});

export const adminListProjects = createServerFn({ method: "GET" })
  .validator(z.object({ status: z.enum([...STATUSES, "open"]) }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const where =
      data.status === "open"
        ? db()`where p.status not in ('completed', 'cancelled')`
        : db()`where p.status = ${data.status}`;
    return listSelect(where);
  });

export const getProject = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const me = await requireUser();
    let project: Project;
    try {
      project = await loadProjectFor(me, data.id);
    } catch {
      return null;
    }
    const sql = db();
    const [files, messages, review, customer] = await Promise.all([
      sql<
        ProjectFile[]
      >`select ${sql.unsafe(FILE_COLUMNS)} from project_files where project_id = ${project.id} order by created_at`,
      sql<
        ProjectMessage[]
      >`select * from project_messages where project_id = ${project.id} order by created_at`,
      sql`select 1 from reviews where project_id = ${project.id} limit 1`,
      me.role === "admin"
        ? sql<Pick<User, "full_name" | "email" | "company" | "phone">[]>`
            select full_name, email, company, phone from users where id = ${project.customer_id}`
        : Promise.resolve([]),
    ]);
    return {
      project,
      files,
      messages,
      hasReview: review.length > 0,
      customer: customer[0] ?? null,
    };
  });

export const createProject = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().trim().min(1, "Give your project a name.").max(140),
      platform: z.string().max(40),
      video_type: z.string().max(40),
      aspect_ratio: z.string().max(10),
      target_length: z.string().max(40).nullable(),
      deadline: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .nullable(),
      style_notes: z.string().trim().max(4000).nullable(),
      music_preference: z.string().trim().max(500).nullable(),
      footage_link: z.string().trim().url("Footage link must be a valid URL.").max(2000).nullable(),
    }),
  )
  .handler(async ({ data }) => {
    const me = await requireUser();
    const [row] = await db()<{ id: string }[]>`
      insert into projects ${db()({ ...data, customer_id: me.id })}
      returning id
    `;
    return row;
  });

/**
 * Status changes. Customers may only: cancel a submitted project, or approve / request a
 * revision on a delivered one. Editors may set any status.
 */
export const setProjectStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().uuid(),
      status: z.enum(STATUSES),
      note: z.string().trim().max(4000).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const me = await requireUser();
    const project = await loadProjectFor(me, data.id);
    if (me.role !== "admin") {
      const allowed =
        (project.status === "submitted" && data.status === "cancelled") ||
        (project.status === "delivered" &&
          (data.status === "completed" || data.status === "revision_requested"));
      if (!allowed) throw new HttpError(403, "That status change isn't allowed.");
    }
    await db().begin(async (tx) => {
      await tx`update projects set status = ${data.status} where id = ${project.id}`;
      if (data.note) {
        await tx`
          insert into project_messages (project_id, author_id, body, from_editor)
          values (${project.id}, ${me.id}, ${data.note}, ${me.role === "admin"})
        `;
      }
    });
    return { ok: true };
  });

export const editorUpdateProject = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().uuid(),
      status: z.enum(STATUSES),
      editor_notes: z.string().trim().max(4000).nullable(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    await db()`update projects set status = ${data.status}, editor_notes = ${data.editor_notes} where id = ${data.id}`;
    return { ok: true };
  });

export const postMessage = createServerFn({ method: "POST" })
  .validator(z.object({ projectId: z.string().uuid(), body: z.string().trim().min(1).max(4000) }))
  .handler(async ({ data }) => {
    const me = await requireUser();
    const project = await loadProjectFor(me, data.projectId);
    const [msg] = await db()<ProjectMessage[]>`
      insert into project_messages (project_id, author_id, body, from_editor)
      values (${project.id}, ${me.id}, ${data.body}, ${me.role === "admin"})
      returning *
    `;
    return msg;
  });

/** Customers may delete their own raw files while the project is still "submitted"; editors any file. */
export const deleteProjectFile = createServerFn({ method: "POST" })
  .validator(z.object({ fileId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const me = await requireUser();
    const [file] = await db()<
      { id: string; project_id: string; kind: string; storage_key: string }[]
    >`
      select id, project_id, kind, storage_key from project_files where id = ${data.fileId}
    `;
    if (!file) throw new HttpError(404, "File not found.");
    const project = await loadProjectFor(me, file.project_id);
    if (me.role !== "admin" && !(file.kind === "raw" && project.status === "submitted")) {
      throw new HttpError(403, "This file can no longer be deleted.");
    }
    await db()`delete from project_files where id = ${file.id}`;
    await removeFile(file.storage_key);
    return { ok: true };
  });

export const listMySubscriptions = createServerFn({ method: "GET" }).handler(async () => {
  const me = await requireUser();
  return db()<Subscription[]>`
    select * from subscriptions where user_id = ${me.id} or email = ${me.email} order by paid_at desc
  `;
});
