import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { lintText } from '../../../test-utils/lint.js';
import jsDefault from '../src/index.js';
import nodeDefault from '../src/node.js';
import tsDefault, { createTypescriptConfig } from '../src/typescript.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'ts-project');
const ruleIdsFor = async (cfg, code, file) => [...new Set((await lint(cfg, code, file)).map((m) => m.ruleId))];
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

test('zero options: test and config files outside every tsconfig lint without type information', async () => {
  for (const file of ['other/c.test.ts', 'vitest.config.ts', 'vitest.shared.ts']) {
    for (const cfg of [tsDefault, nodeDefault]) {
      const messages = await lint(cfg, 'export const v = 1;\n', file);
      assert.deepEqual(messages.filter((m) => m.fatal), [], file);
    }
  }
});

test('typedTests: true lints tests with type information (they must be in a tsconfig)', async () => {
  const typed = createTypescriptConfig({ typedTests: true, tsconfigRootDir: root });
  const outside = await lint(typed, 'export const v = 1;\n', 'other/c.test.ts');
  assert.ok(outside.some((m) => m.fatal), 'a test outside every tsconfig reports a parsing error');
  const inside = await lint(typed, 'export const v = 1;\n', 'src/a.ts');
  assert.deepEqual(inside.filter((m) => m.fatal), []);
});

test('zero options: dist output is ignored', async () => {
  const messages = await lint(tsDefault, 'var x = 1;\n', 'dist/a.js');
  assert.ok(messages.every((m) => /ignored/i.test(m.message)), 'only the "file ignored" notice');
});

test('import-x/first is off in tests (vi.mock hoisting) and on in source', async () => {
  const code = "vi.mock('./a.js');\n\nimport { a } from './a.js';\n\nexport const v = a;\n";
  assert.ok(!(await ruleIdsFor(tsDefault, code, 'other/c.test.ts')).includes('import-x/first'));
  assert.ok((await ruleIdsFor(tsDefault, code, 'src/b.ts')).includes('import-x/first'));
});
