import assert from 'node:assert/strict';
import path from 'node:path';

import { fixtureProject, lintText, ruleIds } from '../../../test-utils/lint.js';
import { createReactTypescriptConfig } from '../src/index.js';

export const root = fixtureProject;
export const tsConfig = createReactTypescriptConfig({ tsconfigPath: [path.join(root, 'tsconfig.json')], tsconfigRootDir: root });

/** Rule ids for `code` at `file` (relative to the fixture project); asserts the file parses. */
export async function ids(cfg, code, file) {
  const messages = await lintText(cfg, code, { filePath: path.join(root, file), cwd: root });

  assert.deepEqual(messages.filter((m) => m.fatal), [], 'fixture must parse');

  return ruleIds(messages);
}
