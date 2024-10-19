import type { RouteDefinition } from '@solidjs/router';

import FileTest from '#pages/FileTest';
import Index from '#pages/Index';
import PageNotFound from '#pages/PageNotFound';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    info: { title: 'Home' },
    component: () => <Index />,
  },
  {
    path: 'file-test',
    info: { title: 'File Test' },
    component: () => <FileTest />,
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
