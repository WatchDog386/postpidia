// Lists paid subscriptions from the local database:  npm run subscriptions
// Optional: npm run subscriptions -- --csv > subscriptions.csv
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

try { process.loadEnvFile(".env"); } catch { /* no .env: use defaults */ }

const file = resolve(process.env.DATABASE_PATH || "data/postpidia.db");
if (!existsSync(file)) {
  console.log(`No subscriptions yet (database not created at ${file}).`);
  process.exit(0);
}

const db = new DatabaseSync(file, { readOnly: true });
const rows = db.prepare(
  "SELECT paid_at, email, plan, billing, amount, currency, reference, status FROM subscriptions ORDER BY paid_at DESC",
).all();

if (process.argv.includes("--csv")) {
  const cols = ["paid_at", "email", "plan", "billing", "amount", "currency", "reference", "status"];
  const cell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  console.log(cols.join(","));
  for (const r of rows) console.log(cols.map((c) => cell(r[c])).join(","));
} else if (rows.length === 0) {
  console.log("No subscriptions yet.");
} else {
  console.table(rows);
  console.log(`${rows.length} subscription(s).`);
}
