import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import * as espree from 'espree';

const packages = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'packages');
const files = fs
  .readdirSync(packages)
  .flatMap((dir) => {
    const rulesDir = path.join(packages, dir, 'src', 'rules');

    return fs.existsSync(rulesDir) ? fs.readdirSync(rulesDir).map((file) => path.join(rulesDir, file)) : [];
  })
  .filter((file) => file.endsWith('.js'));

const keyName = (property) => property.key.value ?? property.key.name;

/** Objects holding rule settings: a `rules: {...}` property or a `const xxxRules = {...}` declaration. */
function ruleObjects(node, found = []) {
  if (node && typeof node === 'object') {
    if (node.type === 'Property' && keyName(node) === 'rules' && node.value.type === 'ObjectExpression') found.push(node.value);
    if (node.type === 'VariableDeclarator' && /Rules$/.test(node.id.name ?? '') && node.init?.type === 'ObjectExpression') found.push(node.init);
    for (const child of Object.values(node)) {
      if (child && typeof child === 'object') ruleObjects(child, found);
    }
  }

  return found;
}

/** Problems for one rules file: a rule without a documentation comment block (description, reasoning, URL) or without a blank line after it. */
export function undocumentedRules(source) {
  const ast = espree.parse(source, { ecmaVersion: 'latest', sourceType: 'module', comment: true, range: true });
  const problems = [];

  for (const object of ruleObjects(ast)) {
    for (const property of object.properties) {
      if (property.type !== 'Property') continue;
      const name = keyName(property);
      const comment = ast.comments.filter((c) => c.type === 'Block' && c.range[1] <= property.range[0]).pop();
      const between = comment ? source.slice(comment.range[1], property.range[0]) : 'x';
      const lines = comment?.value.split('\n').map((line) => line.trim()).filter(Boolean) ?? [];

      if (!comment || between.trim() !== '' || !lines.some((line) => /^https?:\/\//.test(line)) || lines.length < 3) {
        problems.push(`${name}: needs a comment block (description, reasoning, URL) directly above it`);
      } else if (!/^,?[ \t]*\r?\n[ \t]*\r?\n/.test(source.slice(property.range[1]))) {
        problems.push(`${name}: needs an empty line after it`);
      }
    }
  }

  return problems;
}

test('the rule files exist', () => {
  assert.ok(files.length >= 8, `found ${files.length} rule files`);
});

test('undocumentedRules flags a rule without a comment block or trailing empty line', () => {
  const good = "export const fooRules = {\n  /*\n    Does a thing.\n    Because.\n    https://example.com/a\n  */\n  a: 'error',\n\n};\n";

  assert.deepEqual(undocumentedRules(good), []);
  assert.equal(undocumentedRules(good.replace(/ {2}\/\*[\s\S]*\*\/\n/, '')).length, 1);
  assert.equal(undocumentedRules(good.replace('\n\n}', '\n}')).length, 1);
  assert.equal(undocumentedRules(good.replace('    https://example.com/a\n', '')).length, 1);
});

for (const file of files) {
  test(`${path.relative(packages, file)}: every rule has a comment block (description, reasoning, URL) and an empty line after it`, () => {
    assert.deepEqual(undocumentedRules(fs.readFileSync(file, 'utf8')), []);
  });
}
