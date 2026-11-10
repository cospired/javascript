import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import jsDefault from '@cospired/eslint-config-base';

import { fixtureProject, lintText, warnRules } from '../../../test-utils/lint.js';
import { testGlobs } from '../src/globs.js';
import tsDefault, { createTypescriptConfig } from '../src/index.js';
import nodeDefault from '../src/node.js';

const root = fixtureProject;
const lint = (cfg, code, file) => lintText(cfg, code, { filePath: path.join(root, file), cwd: root });
const ruleIdsFor = async (cfg, code, file) => [...new Set((await lint(cfg, code, file)).map((m) => m.ruleId))];

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
  for (const file of ['other/c.test.ts', 'tool.config.ts', 'tool.shared.ts']) {
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

test('no rule resolves to "warn": consumers lint with --max-warnings 0', async () => {
  assert.deepEqual(await warnRules(tsDefault, path.join(root, 'src/a.ts'), root), []);
  assert.deepEqual(await warnRules(nodeDefault, path.join(root, 'src/a.ts'), root), []);
});

test('scripts/ get node globals and may log, in every extension', async () => {
  for (const ext of ['js', 'mjs', 'cjs', 'ts', 'mts', 'cts']) {
    const found = await ruleIdsFor(nodeDefault, 'process.exit(1);\nconsole.log(1);\n', `scripts/x.${ext}`);

    assert.ok(!found.includes('no-undef') && !found.includes('no-console'), ext);
  }
});

test('test-file globs also match from a monorepo root config', () => {
  for (const glob of ['test/**', '**/__tests__/**']) assert.ok(testGlobs.includes(glob) && testGlobs.includes(`{apps,packages}/*/${glob}`), glob);
});
