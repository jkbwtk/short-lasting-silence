/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import checker from 'vite-plugin-checker';
import { resolve } from 'node:path';
import { environment, isDev } from './tools/constants';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    solid({ ssr: true }),
    isDev
      ? checker({
          enableBuild: false,
          overlay: true,

          typescript: {
            root: __dirname,
          },
        })
      : undefined,
  ],

  server: {
    port: environment.WEB_PORT,
    hmr: {
      port: environment.HMR_PORT,
    },
  },

  build: {
    minify: environment.BUILD_MINIFY,
    manifest: true,
    target: 'esnext',
    cssTarget: 'esnext',
    emptyOutDir: true,
    sourcemap: environment.BUILD_SOURCEMAP,
  },

  resolve: {
    alias: [
      { find: '#components', replacement: resolve('src/components') },
      { find: '#pages', replacement: resolve('src/pages') },
      { find: '#styles', replacement: resolve('src/styles') },
      { find: '#assets', replacement: resolve('src/assets') },
      { find: '#lib', replacement: resolve('src/lib') },
      { find: '#providers', replacement: resolve('src/providers') },
      { find: '#routes', replacement: resolve('src/routes') },
      // { find: '#locales', replacement: resolve('src/locales') },
      // { find: '#shared', replacement: resolve(cwd(), 'shared/src') },
    ],
  },

  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },

    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['node_modules/@testing-library/jest-dom/vitest'],
    isolate: false,
  },
});
