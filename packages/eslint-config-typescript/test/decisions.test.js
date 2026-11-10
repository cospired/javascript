import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { fixtureProject, lintText, ruleIds, ruleSeverity, warnRules } from '../../../test-utils/lint.js';
import { testGlobs } from '../src/globs.js';
import { createTypescriptConfig } from '../src/index.js';
import { createNodeConfig } from '../src/node.js';

const root = fixtureProject;
const tsOptions = { tsconfigPath: [path.join(root, 'tsconfig.json')], tsconfigRootDir: root };
const tsConfig = createTypescriptConfig(tsOptions);
const lint = async (code, file, cfg = tsConfig) => ruleIds(await lintText(cfg, code, { filePath: path.join(root, file), cwd: root }));

test('no rule resolves to "warn" in the TypeScript configs', async () => {
  assert.deepEqual(await warnRules(tsConfig, path.join(root, 'src/a.ts'), root), []);
  assert.deepEqual(await warnRules(createNodeConfig(tsOptions), path.join(root, 'src/a.ts'), root), []);
});

test('TS config uses the typescript-eslint variants and drops consistent-return', async () => {
  const sev = (id) => ruleSeverity(tsConfig, id, path.join(root, 'src/a.ts'), root);

  for (const id of ['@typescript-eslint/no-shadow', '@typescript-eslint/no-use-before-define', '@typescript-eslint/default-param-last', '@typescript-eslint/no-explicit-any']) assert.equal(await sev(id), 2, id);
  for (const id of ['no-shadow', 'no-use-before-define', 'default-param-last', 'consistent-return']) assert.equal(await sev(id), 0, id);
});

test('scripts/ files get node globals', async () => {
  const found = await lint('process.exit(1);\n', 'scripts/run.mjs');

  assert.ok(!found.includes('no-undef'), 'process should be defined in scripts/');
  assert.ok((await lint('process.exit(1);\n', 'src/run.mjs')).includes('no-undef'));
});

test('test-file globs also match from a monorepo root config', () => {
  for (const glob of ['test/**', '**/__tests__/**', '**/*.{test,spec}.{ts,tsx,mts,cts}']) {
    assert.ok(testGlobs.includes(glob) && testGlobs.includes(`{apps,packages}/*/${glob}`), glob);
  }
});

test('console is allowed in scripts of every extension', async () => {
  for (const ext of ['js', 'mjs', 'cjs', 'ts', 'mts', 'cts']) {
    const found = await lint('console.log(1);\n', `scripts/x.${ext}`);

    assert.ok(!found.includes('no-console'), ext);
  }
});
