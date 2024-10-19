import fs from 'node:fs';
import { join } from 'node:path';
import { generateHydrationScript } from 'solid-js/web';
import { render, routes } from '../dist/server/entryServer.js';

const template = fs.readFileSync('./dist/client/index.html', 'utf-8');

const routesToPrerender = routes
  .map((route) => route.path)
  .filter((path) => !path.includes('*'));

if (!fs.existsSync('./dist/static')) {
  fs.mkdirSync('./dist/static', { recursive: true });
}

for (const url of routesToPrerender) {
  const rendered = await render(url);

  const head = generateHydrationScript();

  const html = template
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', rendered.html ?? '');

  const filePath = join('./dist/static', `${url === '/' ? 'index' : url}.html`);
  fs.writeFileSync(filePath, html);
  console.log('pre-rendered:', filePath);
}
