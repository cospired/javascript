import reactRefresh from 'eslint-plugin-react-refresh';

/** Fast Refresh (Vite HMR): files exporting components may export nothing else but constants. */
export default {
  name: 'cospired/react-refresh',
  plugins: { 'react-refresh': reactRefresh },
  rules: {
    /*
      Keeps components hot-reloadable (Vite Fast Refresh): a file exporting components exports
      nothing else but constants.
    */
    'react-refresh/only-export-components': ['error', { allowConstantExport: true }],

  },
};
