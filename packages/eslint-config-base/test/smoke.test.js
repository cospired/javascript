import assert from 'node:assert/strict';
import test from 'node:test';

test('base JS entry exports a flat config array', async () => {
  const { default: config } = await import('../src/index.js');
  assert.ok(Array.isArray(config));
});
