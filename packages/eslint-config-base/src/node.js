import globals from 'globals';

import baseConfig, { globalIgnores } from './index.js';

export { globalIgnores };

/**
 * Node.js JavaScript config: base JS rules plus Node globals, for CommonJS and ESM alike. `.js` files are parsed as
 * ESM (ESLint's default), which also accepts CommonJS code; `require`/`module` stay defined through the globals.
 */
export default [...baseConfig, { name: 'cospired/node-js', languageOptions: { globals: globals.node } }];
