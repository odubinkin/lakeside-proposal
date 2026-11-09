import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname),
      'server-only': path.resolve(
        import.meta.dirname,
        'node_modules/next/dist/compiled/server-only/empty.js',
      ),
    },
  },
  test: {
    environment: 'jsdom',
    // Use jsdom storage instead of Node's native storage, which requires a file.
    execArgv: ['--no-experimental-webstorage'],
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
        'lib/ai/contracts.ts',
        'lib/ai/form-tool.ts',
        'lib/ai/stream.ts',
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
