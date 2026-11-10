import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { fixtureProject, lintText, ruleIds } from '../../../test-utils/lint.js';
import nodeJsDefault, { createNodeJsConfig } from '../src/node.js';

const cjs = path.join(path.dirname(fixtureProject), 'cjs-project');
const esm = fixtureProject;
const cjsCode = "const fs = require('node:fs');\n\nmodule.exports = { fs, cwd: process.cwd() };\n";
const ids = async (cwd, code, file = 'src/a.js') => ruleIds(await lintText(createNodeJsConfig({ cwd }), code, { filePath: path.join(cwd, file), cwd }));

test('CommonJS package (no "type"): require/module/process are defined', async () => {
  const found = await ids(cjs, cjsCode);

  assert.ok(!found.includes('no-undef'), found.join());
});

test('ESM package ("type": "module"): CommonJS globals are not defined', async () => {
  assert.ok((await ids(esm, cjsCode)).includes('no-undef'));
});

test('node globals exist either way', async () => {
  const code = 'export const c = process.cwd();\n';

  assert.ok(!(await ids(esm, code)).includes('no-undef'));
});

test('default export is a ready-made config array with the global ignores', () => {
  assert.ok(Array.isArray(nodeJsDefault));
  assert.ok(nodeJsDefault.some((item) => item.ignores?.includes('**/dist/**')));
});
