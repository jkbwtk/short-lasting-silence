import type { RouteDefinition } from '@solidjs/router';

import Index from '#pages/Index';
import PageNotFound from '#pages/PageNotFound';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: () => <Index />,
  },
  {
    path: '/404',
    component: () => <PageNotFound />,
  },
];
