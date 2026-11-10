import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { fixtureProject, lintText, warnRules } from '../../../test-utils/lint.js';
import { anyTestGlobs } from '../src/globs.js';
import jsDefault from '../src/index.js';
import nodeDefault from '../src/node.js';

const root = fixtureProject;
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

test('no rule resolves to "warn": consumers lint with --max-warnings 0', async () => {
  assert.deepEqual(await warnRules(jsDefault, path.join(root, 'src/a.js'), root), []);
  assert.deepEqual(await warnRules(nodeDefault, path.join(root, 'src/a.js'), root), []);
});

test('scripts/ get node globals and may log, in every extension', async () => {
  for (const ext of ['js', 'mjs', 'cjs']) {
    const found = await ruleIdsFor(jsDefault, 'process.exit(1);\nconsole.log(1);\n', `scripts/x.${ext}`);

    assert.ok(!found.includes('no-undef') && !found.includes('no-console'), ext);
  }
});

test('explicit index.js imports are not "useless" (ESM has no directory imports)', async () => {
  const found = await ruleIdsFor(jsDefault, "import { a } from './index.js';\n\nexport const b = a;\n", 'src/b.js');

  assert.ok(!found.includes('import-x/no-useless-path-segments'));
});

test('test-file globs also match from a monorepo root config', () => {
  for (const glob of ['test/**', '**/__tests__/**']) assert.ok(anyTestGlobs.includes(glob) && anyTestGlobs.includes(`{apps,packages}/*/${glob}`), glob);
});
