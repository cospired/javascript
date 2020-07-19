/* eslint
   strict: 0,
   global-require: 0, -- requires for test
 */

'use strict';

const test = require('tape');

test('all entry points parse', (t) => {

  t.doesNotThrow(() => require('..'), 'index does not throw');

  t.end();
});
