import fs from 'node:fs';
import { generateHydrationScript } from 'solid-js/web';
import { render, routes } from '../dist/server/entryServer.js';

const template = fs.readFileSync('./dist/client/index.html', 'utf-8');

const routesToPrerender = routes.map((route) => route.path);

for (const url of routesToPrerender) {
  const rendered = render(url);

  const head = generateHydrationScript();

  const html = template
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', rendered.html ?? '');

  const filePath = `./dist/static${url === '/' ? '/index' : url}.html`;
  fs.writeFileSync(filePath, html);
  console.log('pre-rendered:', filePath);
}
