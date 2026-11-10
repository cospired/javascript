import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { lintText, ruleIds } from '../../../test-utils/lint.js';
import jsConfig from '../src/index.js';
import { createReactTypescriptConfig } from '../src/typescript.js';

export const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'ts-project');
export const tsConfig = createReactTypescriptConfig({ tsconfigPath: [path.join(root, 'tsconfig.json')], tsconfigRootDir: root });
export { jsConfig };

/** Rule ids for `code` at `file` (relative to the fixture project); asserts the file parses. */
export async function ids(cfg, code, file) {
  const messages = await lintText(cfg, code, { filePath: path.join(root, file), cwd: root });
  assert.deepEqual(messages.filter((m) => m.fatal), [], 'fixture must parse');

  return ruleIds(messages);
}
