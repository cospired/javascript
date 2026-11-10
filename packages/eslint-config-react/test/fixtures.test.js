import assert from 'node:assert/strict';
import test from 'node:test';

import { ids, jsConfig, tsConfig } from './helpers.js';

const hook = 'function useThing() {\n  return 1;\n}\n\nexport function A({ c }) {\n  if (c) {\n    useThing();\n  }\n\n  return null;\n}\n';
const message = 'export const m = intl.formatMessage({ id: "a" });\n';

test('hooks rule flags a conditional hook call', async () => {
  assert.ok((await ids(jsConfig, hook, 'src/a.jsx')).includes('react-hooks/rules-of-hooks'));
});

test('formatjs flags a missing defaultMessage in src, not in tests', async () => {
  const typed = `declare const intl: { formatMessage: (d: { id: string }) => string };\n\n${  message}`;

  assert.ok((await ids(tsConfig, typed, 'src/a.tsx')).includes('formatjs/enforce-default-message'));
  assert.ok(!(await ids(tsConfig, typed, 'src/a.test.tsx')).includes('formatjs/enforce-default-message'));
});

test('browser globals are defined', async () => {
  assert.ok(!(await ids(jsConfig, 'export const w = window.innerWidth;\n', 'src/a.js')).includes('no-undef'));
});

test('react-refresh flags a non-component export next to a component', async () => {
  const code = 'export function A() {\n  return <div />;\n}\n\nexport function helper() {\n  return 1;\n}\n';

  assert.ok((await ids(jsConfig, code, 'src/a.jsx')).includes('react-refresh/only-export-components'));
});

test('two calls to createReactTypescriptConfig return independent arrays', async () => {
  const { createReactTypescriptConfig } = await import('../src/typescript.js');
  const a = createReactTypescriptConfig({ tsconfigRootDir: '/a' });
  const b = createReactTypescriptConfig({ tsconfigRootDir: '/b' });

  assert.notEqual(a, b);
  a.length = 0;
  assert.ok(b.length > 0);
});
