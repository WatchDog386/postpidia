/** Human-readable message from anything thrown by a server function or fetch. */
export function errorMessage(err: unknown, fallback = "Something went wrong. Please try again.") {
  const msg = err instanceof Error ? err.message : typeof err === "string" ? err : "";
  if (!msg) return fallback;
  // Validation failures arrive as a JSON list of zod issues; show the first one.
  if (msg.trimStart().startsWith("[")) {
    try {
      const issues = JSON.parse(msg) as { message?: string }[];
      if (issues[0]?.message) return issues[0].message;
    } catch {
      /* not JSON */
    }
  }
  return msg;
}
