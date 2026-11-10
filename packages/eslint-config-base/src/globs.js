/** File globs shared by the configs. */
export const tsExtensions = ['.ts', '.tsx', '.mts', '.cts'];
/** Patterns are relative to the eslint config's directory; the `{apps,packages}/*` twins cover one root config linting a monorepo. */
export const withMonorepoTwins = (globs) => globs.flatMap((glob) => [glob, `{apps,packages}/*/${glob}`]);
export const testGlobs = withMonorepoTwins(['**/*.{test,spec}.{ts,tsx,mts,cts}', 'test/**', 'tests/**', '**/__tests__/**']);
/** Any language: the same test files for rules that also apply to JS (formatjs, devDependency imports). */
export const anyTestGlobs = withMonorepoTwins(['**/*.{test,spec}.{ts,tsx,mts,cts,js,jsx,mjs,cjs}', 'test/**', 'tests/**', '**/__tests__/**']);
/** JS files can be matched by a consumer's `files`; they are never type-checked. */
export const jsFiles = ['**/*.{js,jsx,mjs,cjs}'];

/**
 * Files linted without type information unless `typedTests: true`: tests, TypeScript files at the package root
 * (vitest.config.ts, drizzle.config.ts, ...) and scripts. They are often not part of any tsconfig (build configs
 * exclude them), and type-aware linting reports a parsing error for such files.
 */
export const untypedGlobs = [...testGlobs, ...withMonorepoTwins(['*.{ts,mts,cts}', 'scripts/**/*.{ts,mts,cts}'])];
