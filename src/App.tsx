/* @refresh reload */
import FilesystemProvider from '#providers/FilesystemProvider';
import '#styles/index.scss';
import { MetaProvider } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { Suspense, isServer } from 'solid-js/web';
import { routes } from './routes';

const App: Component<{ url?: string }> = (props) => {
  return (
    <MetaProvider>
      <FilesystemProvider>
        {/* Pre rendering fails without <Suspense>, dev server works fine without it */}
        <Suspense>
          <Router url={isServer ? props.url : ''}>{routes}</Router>
        </Suspense>
      </FilesystemProvider>
    </MetaProvider>
  );
};

export default App;
