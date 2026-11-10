import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { loadedRules, lintText, ruleIds, ruleSeverity, warnRules } from '../../../test-utils/lint.js';
import config from '../src/index.js';
import { createNodeConfig } from '../src/node.js';
import { createTypescriptConfig } from '../src/typescript.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'ts-project');
const tsOptions = { tsconfigPath: [path.join(root, 'tsconfig.json')], tsconfigRootDir: root };
const tsConfig = createTypescriptConfig(tsOptions);
const lint = async (code, file = 'src/a.js', cfg = config) => ruleIds(await lintText(cfg, code, { filePath: path.join(root, file), cwd: root }));

// [rule, code that must be flagged, code that must pass]
const cases = [
  ['eqeqeq', 'export const a = (x, y) => x == y;\n', 'export const a = (x) => x == null;\n'],
  ['no-param-reassign', 'export function f(a) {\n  a = 1;\n\n  return a;\n}\n', 'export function f(a) {\n  a.x = 1;\n}\n'],
  ['consistent-return', 'export function f(a) {\n  if (a) {\n    return 1;\n  }\n}\n', 'export function f(a) {\n  if (a) {\n    return 1;\n  }\n\n  return 2;\n}\n'],
  ['no-shadow', 'const a = 1;\n\nexport function f() {\n  const a = 2;\n\n  return a;\n}\n\nexport { a };\n', 'const a = 1;\n\nexport function f() {\n  const b = 2;\n\n  return b;\n}\n\nexport { a };\n'],
  ['prefer-template', "export const s = (b) => 'a' + b;\n", 'export const s = (b) => `a${b}`;\n'],
  ['no-nested-ternary', 'export const s = (a, b) => (a ? 1 : b ? 2 : 3);\n', 'export const s = (a) => (a ? 1 : 2);\n'],
  ['no-else-return', 'export function f(a) {\n  if (a) {\n    return 1;\n  } else {\n    return 2;\n  }\n}\n', 'export function f(a) {\n  if (a) {\n    return 1;\n  }\n\n  return 2;\n}\n'],
  ['curly', 'export function f(a) {\n  if (a)\n    return 1;\n\n  return 2;\n}\n', 'export function f(a) {\n  if (a) return 1;\n\n  return 2;\n}\n'],
  ['no-use-before-define', 'export const r = f();\n\nfunction f() {\n  return 1;\n}\n', 'function f() {\n  return 1;\n}\n\nexport const r = f();\n'],
  ['default-param-last', 'export function f(a = 1, b) {\n  return [a, b];\n}\n', 'export function f(b, a = 1) {\n  return [a, b];\n}\n'],
  ['no-await-in-loop', 'export async function f(xs) {\n  for (const x of xs) {\n    await x;\n  }\n}\n', 'export async function f(xs) {\n  await Promise.all(xs);\n}\n'],
  ['no-unused-vars', 'export function f(a) {\n  return 1;\n}\n', 'export function f(_a) {\n  return 1;\n}\n'],
  ['no-unused-vars', 'export function f() {\n  const x = 1;\n}\n', 'export function f() {\n  const _x = 1;\n}\n'],
  ['no-console', 'console.log(1);\n', 'console.warn(1);\nconsole.error(2);\n'],
];

for (const [rule, bad, good] of cases) {
  test(`${rule}: flagged / accepted`, async () => {
    assert.ok((await lint(bad)).includes(rule), `${rule} should flag`);
    assert.ok(!(await lint(good)).includes(rule), `${rule} should accept`);
  });
}

test('no-plusplus is not enabled; hapi plugin is gone', () => {
  const rules = loadedRules(config);
  assert.ok(!rules.has('no-plusplus'));
  assert.deepEqual([...rules].filter((id) => id.startsWith('@hapi/')), []);
});

test('functions need no blank line at the start of the body (Prettier-safe)', async () => {
  assert.ok(!(await lint('export function f() {\n  return 1;\n}\n')).includes('@stylistic/padding-line-between-statements'));
});

test('import-x named-as-default rules are off', () => {
  const rules = loadedRules(config);
  assert.ok(!rules.has('import-x/no-named-as-default') && !rules.has('import-x/no-named-as-default-member'));
});

test('no rule resolves to "warn" in any base config', async () => {
  assert.deepEqual(await warnRules(config, path.join(root, 'src/a.js'), root), []);
  assert.deepEqual(await warnRules(tsConfig, path.join(root, 'src/a.ts'), root), []);
  assert.deepEqual(await warnRules(createNodeConfig(tsOptions), path.join(root, 'src/a.ts'), root), []);
});

test('TS config uses the typescript-eslint variants and drops consistent-return', async () => {
  const sev = (id) => ruleSeverity(tsConfig, id, path.join(root, 'src/a.ts'));
  for (const id of ['@typescript-eslint/no-shadow', '@typescript-eslint/no-use-before-define', '@typescript-eslint/default-param-last', '@typescript-eslint/no-explicit-any']) assert.equal(await sev(id), 2, id);
  for (const id of ['no-shadow', 'no-use-before-define', 'default-param-last', 'consistent-return']) assert.equal(await sev(id), 0, id);
});

test('scripts/ files get node globals in every base config', async () => {
  for (const [name, cfg] of [['js', config], ['ts', tsConfig]]) {
    const found = await lint('process.exit(1);\n', 'scripts/run.mjs', cfg);
    assert.ok(!found.includes('no-undef'), `${name}: process should be defined in scripts/`);
  }
  assert.ok((await lint('process.exit(1);\n', 'src/run.mjs', tsConfig)).includes('no-undef'));
});

test('test-file globs also match from a monorepo root config', async () => {
  const { testGlobs } = await import('../src/globs.js');
  for (const glob of ['test/**', '**/__tests__/**', '**/*.{test,spec}.{ts,tsx,mts,cts}']) {
    assert.ok(testGlobs.includes(glob) && testGlobs.includes(`{apps,packages}/*/${glob}`), glob);
  }
});

test('console is allowed in scripts of every extension', async () => {
  for (const ext of ['js', 'mjs', 'cjs', 'ts', 'mts', 'cts']) {
    const found = await lint('console.log(1);\n', `scripts/x.${ext}`, createTypescriptConfig(tsOptions));
    assert.ok(!found.includes('no-console'), ext);
  }
});
