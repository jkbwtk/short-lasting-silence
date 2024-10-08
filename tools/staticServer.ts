import express from 'express';
import compression from 'compression';
import { environment } from './constants';
import sirv from 'sirv';
import { readFileSync } from 'node:fs';

const app = express();

const pageNotFoundHtml = readFileSync('./dist/static/404.html', 'utf-8');

app.use(compression({ level: 9 }));
app.use('/assets', sirv('./dist/client/assets', { extensions: [] }));
app.use('/', sirv('./dist/static'));

app.get('*', (_req, res) => {
  res.status(404).send(pageNotFoundHtml);
});

app.listen(environment.WEB_PORT, () => {
  console.log(`Server started at http://localhost:${environment.WEB_PORT}`);
});
