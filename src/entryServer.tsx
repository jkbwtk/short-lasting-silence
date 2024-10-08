import { renderToString } from 'solid-js/web';
import App from './App';
import { routes } from './routes';

export function render(url: string) {
  const html = renderToString(() => <App url={url} />);
  return { html };
}

export { routes };
