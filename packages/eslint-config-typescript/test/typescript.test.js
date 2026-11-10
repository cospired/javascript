import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { lintText, ruleIds, ruleSeverity } from '../../../test-utils/lint.js';
import { createTypescriptConfig } from '../src/index.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'ts-project');
const abs = (file) => path.join(root, file);
const options = { tsconfigPath: [abs('tsconfig.json'), abs('tsconfig.test.json')], tsconfigRootDir: root };
const config = createTypescriptConfig(options);
const lint = (code, file = 'src/a.ts', cfg = config) => lintText(cfg, code, { filePath: abs(file), cwd: root });
const ids = async (...args) => {
  const messages = await lint(...args);

  assert.deepEqual(messages.filter((m) => m.fatal), [], 'fixture must parse');

  return ruleIds(messages);
};

test('explicit-function-return-type: required in src, not in *.test.ts; expressions allowed', async () => {
  const rule = '@typescript-eslint/explicit-function-return-type';

  assert.ok((await ids('export function f() {\n  return 1;\n}\n')).includes(rule));
  assert.ok(!(await ids('export function f() {\n  return 1;\n}\n', 'test/a.test.ts')).includes(rule));
  assert.ok(!(await ids('export const n = [1].map((v) => v + 1);\n')).includes(rule));
});

test('no-misused-promises flags an async callback used as a condition', async () => {
  const code = 'const p = async (): Promise<boolean> => true;\n\nif (p()) {\n  console.info(1);\n}\n';

  assert.ok((await ids(code)).includes('@typescript-eslint/no-misused-promises'));
});

test('no-generated-empty-object-type is an error for TS files', async () => {
  assert.equal(await ruleSeverity(config, '@typescript-eslint/no-generated-empty-object-type', abs('src/a.ts'), root), 2);
});

test('accepts an array of tsconfigs: src and test files both lint without parse errors', async () => {
  for (const file of ['src/a.ts', 'test/a.test.ts']) {
    const messages = await lint('export const v = 1;\n', file);

    assert.deepEqual(messages.filter((m) => m.fatal), [], file);
  }
});

test('a file outside every tsconfig reports a parsing error and does not throw', async () => {
  const messages = await lint('export const v = 1;\n', 'other/b.ts');

  assert.ok(messages.some((m) => m.fatal && /parsing error/i.test(m.message)));
});

test('.mjs config files are linted without type-aware errors', async () => {
  const messages = await lint('export default {};\n', 'eslint.config.mjs');

  assert.deepEqual(messages.filter((m) => m.fatal), []);
});

test('#alias imports resolve as internal, before relative imports', async () => {
  const code = "import { x } from '#shared/x';\n\nimport { y } from './a.js';\n\nexport const z = x + y;\n";
  const found = await ids(code, 'src/b.ts');

  assert.ok(!found.includes('import-x/no-unresolved'));
  assert.ok(!found.includes('import-x/order'));
});

test('importOrder.pathGroups moves an alias into another group', async () => {
  const code = "import { x } from '#shared/x';\nimport { ESLint } from 'eslint';\n\nexport const z = [x, ESLint];\n";
  const misordered = async (cfg) => (await lint(code, 'src/b.ts', cfg)).some((m) => /should occur before/.test(m.message));

  assert.ok(await misordered(config));
  const grouped = createTypescriptConfig({ ...options, importOrder: { pathGroups: [{ pattern: '#shared/**', group: 'external', position: 'before' }] } });

  assert.ok(!(await misordered(grouped)));
});

test('two calls return independent arrays', () => {
  const a = createTypescriptConfig(options);
  const b = createTypescriptConfig({ ...options, files: ['x/**/*.ts'] });

  assert.notEqual(a, b);
  assert.notDeepEqual(a, b);
  a.length = 0;
  assert.ok(createTypescriptConfig(options).length > 0);
});

test('every rule exists and JS configs hold no TypeScript rules', async () => {
  const { missingRules, loadedRules } = await import('../../../test-utils/lint.js');

  assert.deepEqual(missingRules(config), []);
  const { default: js } = await import('@cospired/eslint-config-base');

  assert.deepEqual([...loadedRules(js)].filter((id) => id.startsWith('@typescript-eslint/')), []);
});
