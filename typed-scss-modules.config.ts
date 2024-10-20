import type { ConfigOptions } from 'typed-scss-modules/dist/lib/core';

export const config: Partial<ConfigOptions> = {
  // exportType: 'default',
  ignore: ['**/index.scss'],
  updateStaleOnly: true,
};
