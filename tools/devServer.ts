import { type WatchEventType, watch } from 'node:fs';
import fs from 'node:fs/promises';
import { join } from 'node:path';
import { $ } from 'bun';
import express from 'express';
import { generateHydrationScript } from 'solid-js/web';
import { createServer } from 'vite';
import { environment } from './constants.js';

const app = express();
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

app.use(vite.middlewares);

app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace('/', '');

    const template = await fs.readFile('./index.html', 'utf-8');
    const transformedTemplate = await vite.transformIndexHtml(url, template);
    const render = (await vite.ssrLoadModule('/src/entryServer.tsx')).render;

    const rendered = await render(url);

    const head = (rendered.head ?? '') + generateHydrationScript();

    const html = transformedTemplate
      .replace('<!--app-head-->', head)
      .replace('<!--app-html-->', rendered.html ?? '');

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (e) {
    if (e instanceof Error) {
      // vite.ssrFixStacktrace(e);
      // console.log(e.stack);
      // res.status(500).end(e.stack);
    }
  }
});

app.listen(environment.WEB_PORT, () => {
  console.log(`Server started at http://localhost:${environment.WEB_PORT}`);
});

async function handleFileChange(
  event: WatchEventType,
  filename: string | Buffer | null,
) {
  if (
    event === 'change' &&
    typeof filename === 'string' &&
    filename.endsWith('module.scss')
  ) {
    await $`bun run --bun typed-scss-modules ${join('src/styles', filename)} --logLevel error`;
  }
}

const watcher = watch('./src/styles', { recursive: false }, handleFileChange);

process.on('SIGINT', () => {
  watcher.close();
  process.exit();
});
