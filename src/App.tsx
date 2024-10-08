/* @refresh reload */
import '#styles/index.scss';
import { Router } from '@solidjs/router';
import { routes } from './routes';
import { isServer } from 'solid-js/web';
import { MetaProvider } from '@solidjs/meta';

const App: Component<{ url?: string }> = (props) => {
  return (
    <MetaProvider>
      <Router url={isServer ? props.url : ''}>{routes}</Router>
    </MetaProvider>
  );
};

export default App;
