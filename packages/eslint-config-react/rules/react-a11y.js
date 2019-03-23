module.exports = {
  rules: {
    /*
      Enforce that a control (an interactive element) has a text label.
      https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
      TODO: not yet in airbnb as of 2019-03-23, check for airbnb default
    */
    'jsx-a11y/control-has-associated-label': ['error', {
      ignoreElement: [],
      ignoreRoles: [],
      labelAttributes: [],
      controlComponents: [],
      depth: 25,
    }],
  },
};
