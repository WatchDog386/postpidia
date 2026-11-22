import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, rename, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { randomUUID } from "node:crypto";

/** Where uploaded footage and deliverables are stored. Mount a persistent volume here in production. */
export const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || "uploads");

/** Per-file upload limit (default 10 GB). Remember to raise your reverse proxy's limit too. */
export const MAX_UPLOAD_BYTES = Number(process.env.MAX_UPLOAD_BYTES || 10 * 1024 ** 3);

export class TooLargeError extends Error {}

/** Storage keys are generated server-side only, so user input never becomes a path. */
export function newStorageKey(projectId: string, kind: "raw" | "deliverable", fileName: string) {
  const ext = path
    .extname(fileName)
    .replace(/[^.\w]/g, "")
    .slice(0, 12)
    .toLowerCase();
  return `${projectId}/${kind}/${randomUUID()}${ext}`;
}

export function resolveKey(key: string) {
  const full = path.resolve(UPLOAD_DIR, key);
  if (!full.startsWith(UPLOAD_DIR + path.sep)) throw new Error("Invalid storage key");
  return full;
}

/** Stream a request body to disk, enforcing MAX_UPLOAD_BYTES. Returns bytes written. */
export async function saveStream(body: ReadableStream<Uint8Array>, key: string) {
  const dest = resolveKey(key);
  await mkdir(path.dirname(dest), { recursive: true });
  const tmp = `${dest}.part`;
  let bytes = 0;
  const counter = new Transform({
    transform(chunk: Buffer, _enc, cb) {
      bytes += chunk.length;
      if (bytes > MAX_UPLOAD_BYTES) cb(new TooLargeError("File is larger than the upload limit."));
      else cb(null, chunk);
    },
  });
  try {
    await pipeline(
      Readable.fromWeb(body as import("node:stream/web").ReadableStream),
      counter,
      createWriteStream(tmp),
    );
    await rename(tmp, dest);
    return bytes;
  } catch (err) {
    await unlink(tmp).catch(() => {});
    throw err;
  }
}

export async function removeFile(key: string) {
  await unlink(resolveKey(key)).catch(() => {});
}

export async function fileSize(key: string) {
  return (await stat(resolveKey(key))).size;
}

/** A web ReadableStream for a byte range of a stored file. */
export function readStream(key: string, range?: { start: number; end: number }) {
  return Readable.toWeb(createReadStream(resolveKey(key), range)) as ReadableStream<Uint8Array>;
}
