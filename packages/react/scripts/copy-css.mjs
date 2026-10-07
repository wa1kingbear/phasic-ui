import { cp, mkdir, readdir } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

const sourceRoot = fileURLToPath(new URL('../src/', import.meta.url));
const outputRoot = fileURLToPath(new URL('../dist/', import.meta.url));

async function copyCss(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const source = join(directory, entry.name);

      if (entry.isDirectory()) {
        await copyCss(source);
        return;
      }

      if (extname(entry.name) !== '.css') {
        return;
      }

      const destination = join(outputRoot, relative(sourceRoot, source));

      await mkdir(dirname(destination), { recursive: true });
      await cp(source, destination);
    }),
  );
}

await copyCss(sourceRoot);
