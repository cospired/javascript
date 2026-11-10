import baseConfig, { globalIgnores, prettierLast } from '@cospired/eslint-config-base';

import formatjs from './rules/formatjs.js';
import reactHooks from './rules/react-hooks.js';
import reactRefresh from './rules/react-refresh.js';
import react from './rules/react.js';

export { globalIgnores };

/** React JavaScript config: base JS + React rules. */
export default [...baseConfig, ...react, ...reactHooks, reactRefresh, formatjs, ...prettierLast];
