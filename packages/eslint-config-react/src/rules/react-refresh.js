import reactRefresh from 'eslint-plugin-react-refresh';

/** Fast Refresh (Vite HMR): files exporting components may export nothing else but constants. */
export default {
  name: 'cospired/react-refresh',
  plugins: { 'react-refresh': reactRefresh },
  rules: { 'react-refresh/only-export-components': ['error', { allowConstantExport: true }] },
};
