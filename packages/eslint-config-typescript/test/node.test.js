import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { lintText, ruleIds } from '../../../test-utils/lint.js';
import { createTypescriptConfig } from '../src/index.js';
import { createNodeConfig } from '../src/node.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'ts-project');
const options = { tsconfigPath: [path.join(root, 'tsconfig.json')], tsconfigRootDir: root };
const node = createNodeConfig(options);
const ids = async (cfg, code, file) => {
  const messages = await lintText(cfg, code, { filePath: path.join(root, file), cwd: root });

  assert.deepEqual(messages.filter((m) => m.fatal), [], 'fixture must parse');

  return ruleIds(messages);
};

test('node globals are defined (process is not no-undef)', async () => {
  const code = 'process.exit(1);\n';

  assert.ok((await ids(createTypescriptConfig(options), code, 'src/x.mjs')).includes('no-undef'));
  assert.ok(!(await ids(node, code, 'src/x.mjs')).includes('no-undef'));
});

test('string || fallback is allowed, number || fallback is flagged', async () => {
  const rule = '@typescript-eslint/prefer-nullish-coalescing';
  const str = "export function f(s: string | undefined): string {\n  return s || 'x';\n}\n";
  const num = 'export function f(n: number | undefined): number {\n  return n || 1;\n}\n';

  assert.ok(!(await ids(node, str, 'src/a.ts')).includes(rule));
  assert.ok((await ids(node, num, 'src/a.ts')).includes(rule));
});

test('no-console is allowed in scripts/ but not in src/', async () => {
  const code = 'console.log(1);\n';

  assert.ok(!(await ids(node, code, 'scripts/run.mjs')).includes('no-console'));
  assert.ok((await ids(node, code, 'src/run.mjs')).includes('no-console'));
});

test('JS files matched by `files` are linted without type-aware rules (no crash)', async () => {
  const cfg = createNodeConfig({ ...options, files: ['src/**/*.{ts,js}', '*.{ts,js}'] });
  const found = await ids(cfg, 'export const a = (x) => x || 1;\n', 'src/c.js');

  assert.ok(!found.includes('@typescript-eslint/prefer-nullish-coalescing'));
  assert.ok(!found.includes('@typescript-eslint/explicit-function-return-type'));
});
