import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { ContentKey, ContentMap } from "@/types/content";

export const CONTENT_KEYS = [
  "settings",
  "home",
  "about",
  "gallery",
  "menu",
  "contact",
] as const;

const DATA_DIR = path.join(process.cwd(), "data");

function filePath(key: ContentKey) {
  return path.join(DATA_DIR, `${key}.json`);
}

export function isContentKey(value: string): value is ContentKey {
  return (CONTENT_KEYS as readonly string[]).includes(value);
}

/** Reads a JSON content file from disk. Always fresh so Studio edits show up. */
export async function getContent<K extends ContentKey>(key: K): Promise<ContentMap[K]> {
  const raw = await fs.readFile(filePath(key), "utf-8");
  return JSON.parse(raw) as ContentMap[K];
}

export async function getAllContent(): Promise<ContentMap> {
  const entries = await Promise.all(
    CONTENT_KEYS.map(async (key) => [key, await getContent(key)] as const)
  );
  return Object.fromEntries(entries) as ContentMap;
}

/**
 * Studio persiste en disco, asi que solo funciona donde el FS es escribible:
 * local o un host con volumen persistente (VPS, Docker, Render Disk).
 * En serverless (Vercel/Netlify) el FS es de solo lectura.
 */
export function isStudioWritable(): boolean {
  return process.env.ENABLE_STUDIO === "true" || process.env.NODE_ENV === "development";
}

/** Writes a JSON content file back to disk (used by the Studio API). */
export async function saveContent<K extends ContentKey>(
  key: K,
  value: ContentMap[K]
): Promise<void> {
  await fs.writeFile(filePath(key), `${JSON.stringify(value, null, 2)}\n`, "utf-8");
}
