import express from 'express';
import compression from 'compression';
import { environment } from './constants';
import sirv from 'sirv';

const app = express();

app.use(compression({ level: 9 }));
app.use('/assets', sirv('./dist/client/assets', { extensions: [] }));
app.use('/', sirv('./dist/static'));

app.listen(environment.WEB_PORT, () => {
  console.log(`Server started at http://localhost:${environment.WEB_PORT}`);
});
