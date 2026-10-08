import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(projectRoot, 'dist');
let html = await readFile(resolve(dist, 'index.html'), 'utf8');

const stylesheet = html.match(/<link rel="stylesheet"[^>]+href="([^\"]+)"[^>]*>/);
const script = html.match(/<script type="module"[^>]+src="([^\"]+)"[^>]*><\/script>/);

if (!stylesheet || !script) {
  throw new Error('Could not find Vite assets to embed in the offline page.');
}

const assetPath = (reference) => resolve(dist, reference.replace(/^\.\//, ''));
const css = await readFile(assetPath(stylesheet[1]), 'utf8');
const js = await readFile(assetPath(script[1]), 'utf8');

html = html
  .replace(stylesheet[0], `<style>${css}</style>`)
  .replace(script[0], `<script type="module">${js.replaceAll('</script', '<\\/script')}</script>`);

await writeFile(resolve(dist, 'offline.html'), html);
