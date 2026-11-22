import { createServerFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";
import { z } from "zod";
import type { User } from "@/lib/types";
import { db } from "@/server/db.server";
import {
  currentUser,
  endSession,
  hashPassword,
  newToken,
  requireUser,
  sha256,
  startSession,
  validatePassword,
  verifyPassword,
} from "@/server/auth.server";
import { sendMail } from "@/server/mail.server";

type Result = { ok: true; user: User } | { ok: false; error: string };

const email = z.string().trim().toLowerCase().email("Enter a valid email address.").max(254);

export const getMe = createServerFn({ method: "GET" }).handler(async () => currentUser());

export const signUp = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email,
      password: z.string(),
      full_name: z.string().trim().max(120).default(""),
      company: z.string().trim().max(120).default(""),
    }),
  )
  .handler(async ({ data }): Promise<Result> => {
    const pwError = validatePassword(data.password);
    if (pwError) return { ok: false, error: pwError };
    const hash = await hashPassword(data.password);
    const [user] = await db()<User[]>`
      insert into users (email, password_hash, full_name, company)
      values (${data.email}, ${hash}, ${data.full_name}, ${data.company})
      on conflict (email) do nothing
      returning id, email, full_name, company, phone, role, created_at
    `;
    if (!user)
      return { ok: false, error: "An account with this email already exists. Try signing in." };
    await startSession(user.id);
    return { ok: true, user };
  });

export const signIn = createServerFn({ method: "POST" })
  .validator(z.object({ email, password: z.string().max(200) }))
  .handler(async ({ data }): Promise<Result> => {
    const [row] = await db()<(User & { password_hash: string })[]>`
      select id, email, full_name, company, phone, role, created_at, password_hash
      from users where email = ${data.email}
    `;
    // Always run a hash so response time doesn't reveal whether the email exists.
    const ok = row
      ? await verifyPassword(data.password, row.password_hash)
      : (await hashPassword(data.password), false);
    if (!row || !ok) return { ok: false, error: "Incorrect email or password." };
    await startSession(row.id);
    const { password_hash: _omit, ...user } = row;
    return { ok: true, user };
  });

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  await endSession();
  return { ok: true };
});

export const updateProfile = createServerFn({ method: "POST" })
  .validator(
    z.object({
      full_name: z.string().trim().max(120),
      company: z.string().trim().max(120),
      phone: z.string().trim().max(40),
    }),
  )
  .handler(async ({ data }) => {
    const me = await requireUser();
    const [user] = await db()<User[]>`
      update users set full_name = ${data.full_name}, company = ${data.company}, phone = ${data.phone}
      where id = ${me.id}
      returning id, email, full_name, company, phone, role, created_at
    `;
    return user;
  });

export const changePassword = createServerFn({ method: "POST" })
  .validator(z.object({ current: z.string().max(200), password: z.string() }))
  .handler(async ({ data }) => {
    const me = await requireUser();
    const pwError = validatePassword(data.password);
    if (pwError) return { ok: false as const, error: pwError };
    const [row] = await db()`select password_hash from users where id = ${me.id}`;
    if (!row || !(await verifyPassword(data.current, row.password_hash))) {
      return { ok: false as const, error: "Your current password is incorrect." };
    }
    await db()`update users set password_hash = ${await hashPassword(data.password)} where id = ${me.id}`;
    return { ok: true as const };
  });

export const requestPasswordReset = createServerFn({ method: "POST" })
  .validator(z.object({ email }))
  .handler(async ({ data }) => {
    const [user] = await db()`select id, email from users where email = ${data.email}`;
    if (user) {
      const token = newToken();
      await db()`
        insert into password_resets (token_hash, user_id, expires_at)
        values (${sha256(token)}, ${user.id}, now() + interval '1 hour')
      `;
      const origin = process.env.APP_URL || getRequestUrl().origin;
      await sendMail(
        user.email,
        "Reset your Postpidia password",
        `Someone asked to reset the password for your Postpidia account.\n\n` +
          `Set a new password here (valid for 1 hour):\n${origin}/auth?mode=reset&token=${token}\n\n` +
          `If this wasn't you, you can ignore this email.`,
      );
    }
    // Same response either way so emails can't be enumerated.
    return { ok: true };
  });

export const resetPassword = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().min(10).max(200), password: z.string() }))
  .handler(async ({ data }): Promise<Result> => {
    const pwError = validatePassword(data.password);
    if (pwError) return { ok: false, error: pwError };
    const sql = db();
    const user = await sql.begin(async (tx) => {
      const [reset] = await tx`
        update password_resets set used_at = now()
        where token_hash = ${sha256(data.token)} and used_at is null and expires_at > now()
        returning user_id
      `;
      if (!reset) return null;
      const [u] = await tx<User[]>`
        update users set password_hash = ${await hashPassword(data.password)} where id = ${reset.user_id}
        returning id, email, full_name, company, phone, role, created_at
      `;
      await tx`delete from sessions where user_id = ${reset.user_id}`;
      return u;
    });
    if (!user)
      return { ok: false, error: "This reset link is invalid or has expired. Request a new one." };
    await startSession(user.id);
    return { ok: true, user };
  });
