import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.tsx'],
    include: ['tests/unit/**/*.test.ts', 'tests/components/**/*.test.tsx'],
    restoreMocks: true,
    clearMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'lib/data.ts',
        'lib/proposal-storage.ts',
        'components/proposal-form/proposal-form.utils.ts',
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        statements: 90,
        branches: 85,
      },
    },
  },
})
