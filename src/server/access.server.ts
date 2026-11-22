import type { Project, User } from "@/lib/types";
import { db } from "./db.server";
import { HttpError } from "./auth.server";

/** Load a project the user may see (owner or admin), or throw 404. */
export async function loadProjectFor(user: User, projectId: string) {
  const [project] = await db()<Project[]>`select * from projects where id = ${projectId}`;
  if (!project || (project.customer_id !== user.id && user.role !== "admin")) {
    throw new HttpError(404, "Project not found.");
  }
  return project;
}
