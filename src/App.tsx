/* @refresh reload */
import '#styles/index.scss';
import { Router } from '@solidjs/router';
import { routes } from './routes';
import { isServer } from 'solid-js/web';
import { MetaProvider } from '@solidjs/meta';
import FilesystemProvider from '#providers/FilesystemProvider';

const App: Component<{ url?: string }> = (props) => {
  return (
    <MetaProvider>
      <FilesystemProvider>
        <Router url={isServer ? props.url : ''}>{routes}</Router>
      </FilesystemProvider>
    </MetaProvider>
  );
};

export default App;
