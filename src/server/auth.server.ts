import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import {
  deleteCookie,
  getCookie,
  getRequestHeader,
  getRequestIP,
  getRequestUrl,
  setCookie,
} from "@tanstack/react-start/server";
import type { User } from "@/lib/types";
import { db } from "./db.server";

export const SESSION_COOKIE = "pp_session";
const SESSION_DAYS = 30;
const SCRYPT_N = 16384;

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

// ---- passwords -------------------------------------------------------------

function scryptAsync(password: string, salt: Buffer, len: number, N: number) {
  return new Promise<Buffer>((resolve, reject) =>
    scrypt(
      password.normalize("NFKC"),
      salt,
      len,
      { N, r: 8, p: 1, maxmem: 64 * 1024 * 1024 },
      (err, key) => (err ? reject(err) : resolve(key)),
    ),
  );
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, 64, SCRYPT_N);
  return ["scrypt", SCRYPT_N, salt.toString("base64"), hash.toString("base64")].join(":");
}

export async function verifyPassword(password: string, stored: string) {
  const [algo, n, saltB64, hashB64] = stored.split(":");
  if (algo !== "scrypt" || !saltB64 || !hashB64) return false;
  const expected = Buffer.from(hashB64, "base64");
  const actual = await scryptAsync(
    password,
    Buffer.from(saltB64, "base64"),
    expected.length,
    Number(n),
  );
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 8)
    return "Password must be at least 8 characters.";
  if (password.length > 200) return "Password is too long.";
  return null;
}

// ---- tokens & sessions -----------------------------------------------------

export const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");
export const newToken = () => randomBytes(32).toString("base64url");

function isHttps() {
  const proto = getRequestHeader("x-forwarded-proto")?.split(",")[0]?.trim();
  if (proto) return proto === "https";
  try {
    return getRequestUrl().protocol === "https:";
  } catch {
    return false;
  }
}

function safeIp() {
  try {
    return getRequestIP({ xForwardedFor: true }) ?? null;
  } catch {
    return null;
  }
}

export async function startSession(userId: string) {
  const token = newToken();
  const expires = new Date(Date.now() + SESSION_DAYS * 86400_000);
  await db()`
    insert into sessions (token_hash, user_id, expires_at, user_agent, ip)
    values (${sha256(token)}, ${userId}, ${expires}, ${getRequestHeader("user-agent")?.slice(0, 300) ?? null}, ${safeIp()})
  `;
  setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isHttps(),
    path: "/",
    expires,
  });
}

export async function endSession() {
  const token = getCookie(SESSION_COOKIE);
  if (token) await db()`delete from sessions where token_hash = ${sha256(token)}`;
  deleteCookie(SESSION_COOKIE, { path: "/" });
}

/** Resolve a raw session token (cookie value) to a user. */
export async function userFromToken(token: string | undefined | null): Promise<User | null> {
  if (!token) return null;
  const [row] = await db()<User[]>`
    select u.id, u.email, u.full_name, u.company, u.phone, u.role, u.created_at
    from sessions s join users u on u.id = s.user_id
    where s.token_hash = ${sha256(token)} and s.expires_at > now()
  `;
  return row ?? null;
}

/** The signed-in user for the current request, or null. */
export function currentUser() {
  return userFromToken(getCookie(SESSION_COOKIE));
}

export async function requireUser() {
  const user = await currentUser();
  if (!user) throw new HttpError(401, "Please sign in to continue.");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") throw new HttpError(403, "Editors only.");
  return user;
}
