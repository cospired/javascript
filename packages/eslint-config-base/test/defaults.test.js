import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { lintText, ruleIds } from '../../../test-utils/lint.js';
import jsDefault from '../src/index.js';
import nodeDefault from '../src/node.js';
import tsDefault from '../src/typescript.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'ts-project');
const lint = (cfg, code, file) => lintText(cfg, code, { filePath: path.join(root, file), cwd: root });

test('default exports are ready-made config arrays that include the global ignores', () => {
  for (const cfg of [jsDefault, tsDefault, nodeDefault]) {
    assert.ok(Array.isArray(cfg));
    assert.ok(cfg.some((item) => item.ignores?.includes('**/dist/**')));
  }
});

test('zero options: TS files lint via the project service, no parse errors', async () => {
  for (const cfg of [tsDefault, nodeDefault]) {
    for (const file of ['src/a.ts', 'src/b.ts']) {
      const messages = await lint(cfg, 'export const v = 1;\n', file);
      assert.deepEqual(messages.filter((m) => m.fatal), [], file);
    }
  }
});

test('zero options: a *.config.ts outside every tsconfig still lints (default project)', async () => {
  // typescript-eslint resolves allowDefaultProject globs against the cwd, i.e. the package being linted.
  const previous = process.cwd();
  process.chdir(root);
  try {
    const messages = await lint(nodeDefault, 'export default { test: true };\n', 'vitest.config.ts');
    assert.deepEqual(messages.filter((m) => m.fatal), []);
    assert.ok(!ruleIds(messages).includes('@typescript-eslint/explicit-function-return-type'));
  } finally {
    process.chdir(previous);
  }
});

test('zero options: dist output is ignored', async () => {
  const messages = await lint(tsDefault, 'var x = 1;\n', 'dist/a.js');
  assert.ok(messages.every((m) => /ignored/i.test(m.message)), 'only the "file ignored" notice');
});
