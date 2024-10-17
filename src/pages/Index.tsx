import { For } from 'solid-js';
import { routes } from '../routes';
import { A } from '@solidjs/router';

const Index: Component = () => {
  const routesWithInfo = Object.values(routes).filter(
    (route) => route.info?.title,
  );

  return (
    <div>
      <For each={routesWithInfo}>
        {({ info, path }) => (
          <div>
            <A href={path}>{info.title}</A>
          </div>
        )}
      </For>
    </div>
  );
};

export default Index;
