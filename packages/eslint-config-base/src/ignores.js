/** Global ignore patterns shared by every config. */
export const globalIgnores = {
  ignores: [
    '**/dist/**',
    '**/build/**',
    '**/node_modules/**',
    '**/*.d.ts',
    '**/*.js.map',
    '**/*.d.ts.map',
    '**/coverage/**',
    '**/.eslintcache',
    '**/*.log',
    '**/.cache/**',
    '**/.turbo/**',
  ],
};
