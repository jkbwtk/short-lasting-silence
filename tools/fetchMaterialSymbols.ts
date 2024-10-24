import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { MaterialSymbol } from '../src/lib/supportedMaterialSymbols';

const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0';

const url = `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=${MaterialSymbol.toSorted().join(',')}`;

const fontsOutDir = join(__dirname, '../src/assets/fonts');

const fontPath = join(fontsOutDir, 'MaterialSymbolsRounded.woff2');

const css = await fetch(url, {
  headers: {
    'User-Agent': userAgent,
  },
}).then((response) => response.text());

const fontUrl = css.match(/url\(([^)]+)\)/)?.[1];

if (!fontUrl) {
  throw new Error('Could not find font URL in CSS');
}

const font = await fetch(fontUrl, {
  headers: {
    'User-Agent': userAgent,
  },
}).then((response) => response.blob());

mkdirSync(fontsOutDir, { recursive: true });
await Bun.write(fontPath, font);
