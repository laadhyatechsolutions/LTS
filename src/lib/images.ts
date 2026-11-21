// Server only (reads the file system) — call from server components and pass results down.
import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = ["webp", "jpg", "jpeg", "png", "avif", "svg"];
const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * Looks for a photo you dropped into /public, by name without the extension.
 * findImage("team/founder") finds public/team/founder.jpg (or .webp, .png, .avif, .svg)
 * and returns "/team/founder.jpg", or null if there is no file yet.
 *
 * Every image slot on the site uses this, so adding a photo needs no code change —
 * save the file with the right name (see docs/06-images.md) and rebuild.
 */
export function findImage(name: string): string | null {
  for (const ext of EXTENSIONS) {
    const rel = `${name}.${ext}`;
    if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return `/${rel}`;
  }
  return null;
}

/** findImage for many names at once — handy for passing to client components */
export function findImages(names: Record<string, string>): Record<string, string | null> {
  return Object.fromEntries(Object.entries(names).map(([key, name]) => [key, findImage(name)]));
}
