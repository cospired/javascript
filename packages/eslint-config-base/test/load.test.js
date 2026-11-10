import assert from 'node:assert/strict';
import test from 'node:test';

import { lintText } from '../../../test-utils/lint.js';
import config from '../src/index.js';

test('base JS config lints a trivial file without errors', async () => {
  const messages = await lintText(config, 'const a = 1;\n\nexport default a;\n', { filePath: 'a.js' });

  assert.deepEqual(messages, []);
});
