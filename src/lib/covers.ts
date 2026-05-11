import { existsSync } from 'node:fs';
import { join, normalize, sep } from 'node:path';

const publicDir = join(process.cwd(), 'public');

function isInsidePublicDir(filePath: string) {
  const normalizedPublicDir = normalize(publicDir);
  const normalizedFilePath = normalize(filePath);

  return (
    normalizedFilePath === normalizedPublicDir ||
    normalizedFilePath.startsWith(`${normalizedPublicDir}${sep}`)
  );
}

export function resolvePublicCover(cover?: string) {
  if (!cover || !cover.startsWith('/') || cover.includes('..')) {
    return undefined;
  }

  const relativePath = normalize(cover.replace(/^\/+/, ''));
  const filePath = join(publicDir, relativePath);

  if (!isInsidePublicDir(filePath) || !existsSync(filePath)) {
    return undefined;
  }

  return cover;
}
