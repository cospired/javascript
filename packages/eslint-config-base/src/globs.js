/** Patterns are relative to the eslint config's directory; the `{apps,packages}/*` twins cover one root config linting a monorepo. */
export const withMonorepoTwins = (globs) => globs.flatMap((glob) => [glob, `{apps,packages}/*/${glob}`]);

/** Test files in any language: used for rules that also apply to JS (formatjs, import order of `vi.mock()`). */
export const anyTestGlobs = withMonorepoTwins(['**/*.{test,spec}.{ts,tsx,mts,cts,js,jsx,mjs,cjs}', 'test/**', 'tests/**', '**/__tests__/**']);
