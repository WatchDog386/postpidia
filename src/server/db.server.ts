import postgres from "postgres";

function create() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your .env, e.g. postgres://postpidia:password@localhost:5432/postpidia",
    );
  }
  return postgres(url, {
    max: Number(process.env.DATABASE_POOL_SIZE ?? 10),
    idle_timeout: 30,
    onnotice: () => {},
    types: {
      // Return timestamps as ISO strings, dates as YYYY-MM-DD and bigints as numbers so
      // values serialize cleanly to the browser and match src/lib/types.ts.
      timestamp: {
        to: 1184,
        from: [1114, 1184],
        serialize: (x: unknown) => (x instanceof Date ? x.toISOString() : String(x)),
        parse: (x: string) => new Date(x).toISOString(),
      },
      date: {
        to: 1082,
        from: [1082],
        serialize: (x: unknown) => String(x),
        parse: (x: string) => x,
      },
      bigint: {
        to: 20,
        from: [20],
        serialize: (x: unknown) => String(x),
        parse: (x: string) => Number(x),
      },
    },
  });
}

type Sql = ReturnType<typeof create>;
const globalForDb = globalThis as unknown as { __postpidiaSql?: Sql };

/** Lazily-created shared connection pool (survives dev hot reloads). */
export function db(): Sql {
  if (!globalForDb.__postpidiaSql) globalForDb.__postpidiaSql = create();
  return globalForDb.__postpidiaSql;
}
