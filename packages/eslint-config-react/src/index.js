import baseConfig, { globalIgnores, prettierLast } from '@cospired/eslint-config-base';

import { reactParts } from './parts.js';

export { globalIgnores };

/** React JavaScript config: base JS + React rules, ready to use as `export { default } from '@cospired/eslint-config-react'`. */
export default [...baseConfig, ...reactParts, ...prettierLast];
