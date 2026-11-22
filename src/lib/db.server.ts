// Local database for paid subscriptions: a single SQLite file on the server.
// Server-only: import this lazily from inside a server function, never from a component.
//
// Uses the SQLite support built into Node.js 22+ (node:sqlite), so there is no database
// server to install. The file lives at DATABASE_PATH, or ./data/postpidia.db relative to
// the folder the app is started from.
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

let db: DatabaseSync | undefined;

function getDb(): DatabaseSync {
  if (db) return db;
  const file = resolve(process.env.DATABASE_PATH || "data/postpidia.db");
  mkdirSync(dirname(file), { recursive: true });
  db = new DatabaseSync(file);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS subscriptions (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      email      TEXT    NOT NULL,
      plan       TEXT    NOT NULL,
      billing    TEXT    NOT NULL,
      amount     REAL    NOT NULL,
      currency   TEXT    NOT NULL DEFAULT 'USD',
      reference  TEXT    NOT NULL UNIQUE,
      status     TEXT    NOT NULL DEFAULT 'active',
      paid_at    TEXT    NOT NULL,
      created_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
    CREATE INDEX IF NOT EXISTS subscriptions_email ON subscriptions (email);
  `);
  return db;
}

export type NewSubscription = {
  email: string;
  plan: string;
  billing: string;
  amount: number;
  currency: string;
  reference: string;
  paidAt: string;
};

/** Saves a verified payment. Saving the same Paystack reference twice is a no-op. */
export function saveSubscription(sub: NewSubscription): void {
  getDb()
    .prepare(
      `INSERT OR IGNORE INTO subscriptions (email, plan, billing, amount, currency, reference, paid_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(sub.email, sub.plan, sub.billing, sub.amount, sub.currency, sub.reference, sub.paidAt);
}
