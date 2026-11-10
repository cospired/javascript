import { withMonorepoTwins } from '@cospired/eslint-config-base';

export const tsExtensions = ['.ts', '.tsx', '.mts', '.cts'];
export const testGlobs = withMonorepoTwins(['**/*.{test,spec}.{ts,tsx,mts,cts}', 'test/**', 'tests/**', '**/__tests__/**']);
/** JS files can be matched by a consumer's `files`; they are never type-checked. */
export const jsFiles = ['**/*.{js,jsx,mjs,cjs}'];

/**
 * Files linted without type information unless `typedTests: true`: tests, TypeScript files at the package root
 * (bundler, test runner or ORM configs such as `tool.config.ts`) and scripts. They are often not part of any tsconfig (build configs
 * exclude them), and type-aware linting reports a parsing error for such files.
 */
export const untypedGlobs = [...testGlobs, ...withMonorepoTwins(['*.{ts,mts,cts}', 'scripts/**/*.{ts,mts,cts}'])];
