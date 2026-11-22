import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { ContactMessage, Review } from "@/lib/types";
import { db } from "@/server/db.server";
import { currentUser, requireAdmin, requireUser } from "@/server/auth.server";
import { loadProjectFor } from "@/server/access.server";

// ---- public reviews --------------------------------------------------------

export const listPublicReviews = createServerFn({ method: "GET" })
  .validator(z.object({ limit: z.number().int().min(1).max(200).default(100) }))
  .handler(async ({ data }) => {
    const me = await currentUser();
    const [reviews, pending] = await Promise.all([
      db()<
        Review[]
      >`select * from reviews where approved order by created_at desc limit ${data.limit}`,
      me
        ? db()<
            { n: number }[]
          >`select count(*)::int as n from reviews where user_id = ${me.id} and not approved`
        : Promise.resolve([{ n: 0 }]),
    ]);
    return { reviews, myPending: pending[0]?.n ?? 0 };
  });

export const createReview = createServerFn({ method: "POST" })
  .validator(
    z.object({
      project_id: z.string().uuid().nullable(),
      rating: z.number().int().min(1).max(5),
      display_name: z.string().trim().min(1, "Add your name.").max(80),
      company: z.string().trim().max(80).nullable(),
      title: z.string().trim().max(120).nullable(),
      body: z.string().trim().min(10, "Please write at least a sentence.").max(2000),
    }),
  )
  .handler(async ({ data }) => {
    const me = await requireUser();
    if (data.project_id) await loadProjectFor(me, data.project_id);
    // New reviews always start unapproved; an editor publishes them from the Studio.
    await db()`insert into reviews ${db()({ ...data, user_id: me.id, approved: false })}`;
    return { ok: true };
  });

// ---- contact form ----------------------------------------------------------

export const submitContact = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().trim().min(1).max(120),
      email: z.string().trim().email().max(254),
      phone: z.string().trim().max(40).nullable(),
      subject: z.string().trim().max(200).nullable(),
      message: z.string().trim().min(1).max(5000),
    }),
  )
  .handler(async ({ data }) => {
    await db()`insert into contact_messages ${db()(data)}`;
    return { ok: true };
  });

// ---- editor moderation -----------------------------------------------------

export const adminCounts = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const [row] = await db()<{ reviews: number; inbox: number }[]>`
    select (select count(*)::int from reviews where not approved) as reviews,
           (select count(*)::int from contact_messages where not handled) as inbox
  `;
  return row;
});

export const adminListReviews = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  return db()<Review[]>`select * from reviews order by approved, created_at desc limit 300`;
});

export const setReviewApproved = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid(), approved: z.boolean() }))
  .handler(async ({ data }) => {
    await requireAdmin();
    await db()`update reviews set approved = ${data.approved} where id = ${data.id}`;
    return { ok: true };
  });

export const deleteReview = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const me = await requireUser();
    await db()`delete from reviews where id = ${data.id} and (user_id = ${me.id} or ${me.role === "admin"})`;
    return { ok: true };
  });

export const adminListContacts = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  return db()<
    ContactMessage[]
  >`select * from contact_messages order by handled, created_at desc limit 300`;
});

export const setContactHandled = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid(), handled: z.boolean() }))
  .handler(async ({ data }) => {
    await requireAdmin();
    await db()`update contact_messages set handled = ${data.handled} where id = ${data.id}`;
    return { ok: true };
  });
