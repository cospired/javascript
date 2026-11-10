import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { lintText } from '../../../test-utils/lint.js';
import jsDefault from '../src/index.js';
import nodeDefault from '../src/node.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'esm-project');
const lint = (cfg, code, file) => lintText(cfg, code, { filePath: path.join(root, file), cwd: root });
const ruleIdsFor = async (cfg, code, file) => [...new Set((await lint(cfg, code, file)).map((m) => m.ruleId))];

test('default exports are ready-made config arrays that include the global ignores', () => {
  for (const cfg of [jsDefault, nodeDefault]) {
    assert.ok(Array.isArray(cfg));
    assert.ok(cfg.some((item) => item.ignores?.includes('**/dist/**')));
  }
});

test('zero options: dist output is ignored', async () => {
  const messages = await lint(jsDefault, 'var x = 1;\n', 'dist/a.js');

  assert.ok(messages.every((m) => /ignored/i.test(m.message)), 'only the "file ignored" notice');
});

test('import-x/first is off in tests (vi.mock hoisting) and on in source', async () => {
  const code = "vi.mock('./a.js');\n\nimport { a } from './a.js';\n\nexport const v = a;\n";

  assert.ok(!(await ruleIdsFor(jsDefault, code, 'src/b.test.js')).includes('import-x/first'));
  assert.ok((await ruleIdsFor(jsDefault, code, 'src/b.js')).includes('import-x/first'));
});
