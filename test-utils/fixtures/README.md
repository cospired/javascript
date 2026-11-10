# Fixture projects

The config tests lint code with the real ESLint and typescript-eslint, so they need a real project on disk. The files are tiny on purpose; their content does not matter, only that they exist and where they sit.

`ts-project`, shared by every package's tests:

| File | Why it exists |
|---|---|
| `tsconfig.json` (includes `src`), `tsconfig.test.json` (includes `test`) | Type-aware linting needs every linted file to belong to a tsconfig; two projects test the `tsconfigPath` array. |
| `src/a.ts`, `src/b.ts`, `src/component.tsx` | Source files inside the tsconfig: TypeScript and JSX parse with type information. |
| `src/shared/x.ts` and the `imports` map in `package.json` | `#shared/*` subpath imports must resolve. |
| `src/a.test.tsx`, `test/a.test.ts` | Test files, inside a tsconfig (`src`, `test`). |
| `other/c.test.ts` | A test file outside every tsconfig: must lint without a parsing error. |
| `tool.config.ts`, `tool.shared.ts` | TypeScript files at the project root outside every tsconfig (bundler, test runner or ORM configs): same. |
