/* @refresh reload */
import { MetaProvider } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { Show, Suspense, isServer } from 'solid-js/web';
import ConsoleUnitPrototype from '#components/ConsoleUnitPrototype';
import DevGrid from '#components/DevGrid';
import { isDev } from '#lib/utils';
import FilesystemProvider from '#providers/FilesystemProvider';
import { routes } from './routes';

const App: Component<{ url?: string }> = (props) => {
  return (
    <MetaProvider>
      <FilesystemProvider>
        {/* Pre rendering fails without <Suspense>, dev server works fine without it */}
        <Suspense>
          <Show when={isDev()}>
            <DevGrid />
          </Show>

          <ConsoleUnitPrototype />
          <Router url={isServer ? props.url : ''}>{routes}</Router>
        </Suspense>
      </FilesystemProvider>
    </MetaProvider>
  );
};

export default App;
