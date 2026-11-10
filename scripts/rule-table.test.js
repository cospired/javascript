import assert from 'node:assert/strict';
import test from 'node:test';

import { buildRuleTable, renderTable } from './rule-table.js';

const sources = { 'no-console': 'eventured' };

test('buildRuleTable lists only rules where ours differs from the baseline', () => {
  const table = buildRuleTable(
    [{ rules: { 'no-console': 'error', eqeqeq: 'error', 'no-var': ['error'], 'no-debugger': 'off' } }],
    [{ rules: { 'no-console': 'warn', eqeqeq: 'error', 'no-var': 'error' } }],
    sources,
  );
  assert.deepEqual(table, [{ rule: 'no-console', ours: 'error', recommended: 'warn', source: 'eventured' }]);
});

test('buildRuleTable includes rules the baseline does not set, marked source "new" when unknown', () => {
  const table = buildRuleTable([{ rules: { 'prefer-const': ['error', { destructuring: 'all' }] } }], [{ rules: {} }], sources);
  assert.deepEqual(table, [{ rule: 'prefer-const', ours: 'error {"destructuring":"all"}', recommended: '-', source: 'new' }]);
});

test('renderTable renders a markdown table with a Decision column', () => {
  const md = renderTable('Base JS', [{ rule: 'no-console', ours: 'error', recommended: 'warn', source: 'eventured' }]);
  assert.match(md, /^## Base JS/m);
  assert.match(md, /\| `no-console` \| error \| warn \| eventured \| open \|/);
});

test('renderTable fills the Decision column from the decisions map', () => {
  const md = renderTable('X', [{ rule: 'no-console', ours: 'error', recommended: 'warn', source: 'eventured' }], { 'no-console': 'error, allow warn/error' });
  assert.match(md, /\| `no-console` \| error \| warn \| eventured \| error, allow warn\/error \|/);
});
