import assert from 'node:assert/strict';
import test from 'node:test';

import { lintText, ruleIds } from '../../../test-utils/lint.js';
import config from '../src/index.js';

const lint = async (code, filePath = 'src/a.js') => ruleIds(await lintText(config, code, { filePath }));

test('requires a description on disable comments', async () => {
  assert.ok((await lint('// eslint-disable-next-line no-console\nconsole.log(1);\n')).includes('@eslint-community/eslint-comments/require-description'));
  assert.ok(!(await lint('// eslint-disable-next-line no-console -- cli output\nconsole.log(1);\n')).includes('@eslint-community/eslint-comments/require-description'));
});

test('requires a ticket on TODO', async () => {
  assert.ok((await lint('// TODO: fix\nexport const a = 1;\n')).includes('todo-plz/ticket-ref'));
  assert.ok(!(await lint('// TODO(#12): fix\nexport const a = 1;\n')).includes('todo-plz/ticket-ref'));
});

test('alphabetizes imports', async () => {
  assert.ok((await lint("import b from 'node:path';\nimport a from 'node:fs';\n\nexport { a, b };\n")).includes('import-x/order'));
});

test('devDependency imports: rejected in src, allowed in *.test.js', async () => {
  const code = "import { test } from 'eslint';\n\nexport default test;\n";

  assert.ok((await lint(code, 'src/a.js')).includes('import-x/no-extraneous-dependencies'));
  assert.ok(!(await lint(code, 'src/a.test.js')).includes('import-x/no-extraneous-dependencies'));
});

test('blank line before return is required', async () => {
  const code = 'export function f(a) {\n  const b = a + 1;\n  return b;\n}\n';

  assert.ok((await lint(code)).includes('@stylistic/padding-line-between-statements'));
  assert.ok(!(await lint('export function f(a) {\n  const b = a + 1;\n\n  return b;\n}\n')).includes('@stylistic/padding-line-between-statements'));
});

test('no-var and prefer-const are flagged', async () => {
  const ids = await lint('var a = 1;\nlet b = 2;\n\nexport { a, b };\n');

  assert.ok(ids.includes('no-var') && ids.includes('prefer-const'));
});
