import type { RouteDefinition } from '@solidjs/router';

import Index from '#pages/Index';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: () => <Index />,
  },
];
