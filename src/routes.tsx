import PageNotFound from '#pages/PageNotFound';
import type { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    info: { title: 'Home' },
    component: lazy(() => import('#pages/Index')),
  },
  {
    path: 'file-test',
    info: { title: 'File Test' },
    component: lazy(() => import('#pages/FileTest')),
  },
  {
    path: '/404',
    component: () => <PageNotFound />,
  },
  {
    path: '*',
    component: () => <PageNotFound />,
  },
];
