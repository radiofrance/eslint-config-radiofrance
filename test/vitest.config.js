import inspector from 'node:inspector';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.js'],
    coverage: {
      enabled: true,
      include: ['source/**/*.js'],
      exclude: ['test/**'],
      reporter: ['text-summary', 'html', 'cobertura', 'lcov'],
    },
    restoreMocks: true,
    testTimeout: inspector.url() ? 0 : undefined,
  },
});
