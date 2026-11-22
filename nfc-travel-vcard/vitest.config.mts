import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const r = (p: string) => path.resolve(path.dirname(fileURLToPath(import.meta.url)), p);

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  resolve: {
    // Reihenfolge wichtig: spezifische Aliase vor dem generischen "@"
    alias: [
      { find: /^@\/lib\/(.*)$/, replacement: r('lib/$1') },
      { find: /^@\/app\/(.*)$/, replacement: r('app/$1') },
      { find: /^@\/components\/(.*)$/, replacement: r('app/components/$1') },
      { find: /^@\/(.*)$/, replacement: r('src/$1') },
    ],
  },
  test: {
    environment: 'node',
    include: ['__tests__/**/*.test.{ts,tsx}'],
  },
});
