import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { fixtureProject, lintText } from '../../../test-utils/lint.js';
import nodeJsDefault from '../src/node.js';

const lint = (code, file = 'src/a.js') => lintText(nodeJsDefault, code, { filePath: path.join(fixtureProject, file), cwd: fixtureProject });

test('CommonJS code parses, and require/module/process are defined', async () => {
  const messages = await lint("const fs = require('node:fs');\n\nmodule.exports = { fs, cwd: process.cwd() };\n");

  assert.deepEqual(messages.filter((m) => m.fatal || m.ruleId === 'no-undef'), []);
});

test('ESM code parses in .js, whatever the surrounding package.json says (monorepo root without "type")', async () => {
  const messages = await lint("import { cwd } from 'node:process';\n\nexport const here = cwd();\n");

  assert.deepEqual(messages.filter((m) => m.fatal), []);
});

test('default export is a ready-made config array with the global ignores', () => {
  assert.ok(Array.isArray(nodeJsDefault));
  assert.ok(nodeJsDefault.some((item) => item.ignores?.includes('**/dist/**')));
});
