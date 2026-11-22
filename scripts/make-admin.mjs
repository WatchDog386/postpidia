#!/usr/bin/env node
// Promote an existing account to editor/admin.
// Usage: DATABASE_URL=postgres://... node scripts/make-admin.mjs you@example.com
import postgres from "postgres";

const email = process.argv[2];
if (!process.env.DATABASE_URL || !email) {
  console.error("Usage: DATABASE_URL=... node scripts/make-admin.mjs you@example.com");
  process.exit(1);
}
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
const rows = await sql`update users set role = 'admin' where email = ${email} returning email`;
console.log(
  rows.length
    ? `${rows[0].email} is now an admin.`
    : `No account found for ${email}. Sign up first.`,
);
await sql.end();
