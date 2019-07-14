[![Build Status](https://travis-ci.com/cospired/javascript.svg?branch=master)](https://travis-ci.com/cospired/javascript)

# @cospired/eslint-config-react

This package provides cospired's react JS .eslintrc as an extensible shared config.

## Usage

We export one ESLint configurations for your usage.

### @cospired/eslint-config-react

Our default export contains all of our ESLint rules, including ECMAScript 6+. It requires `eslint`, `eslint-plugin-eslint-comment`, `@hapi/eslint-plugin-hapi`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y` and `eslint-plugin-react`. If you don't need React, see [@cospired/eslint-config-react](https://www.npmjs.com/package/@cospired/eslint-config-base).

If you use yarn, run `npm info "@cospired/eslint-config-react@latest" peerDependencies` to list the peer dependencies and versions, then run `yarn add --dev <dependency>@<version>` for each listed peer dependency. See below for npm instructions.

1. Install the correct versions of each package, which are listed by the command:

  ```sh
  npm info "@cospired/eslint-config-react@latest" peerDependencies
  ```

  If using **npm 5+**, use this shortcut

  ```sh
  npx install-peerdeps --dev @cospired/eslint-config-react
  ```

  If using **npm < 5**, Linux/OSX users can run

  ```sh
  (
    export PKG=@cospired/eslint-config-react;
    npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
  )
  ```

  Which produces and runs a command like:

  ```sh
    npm install --save-dev @cospired/eslint-config-react eslint@^#.#.# eslint-plugin-import@^#.#.#
  ```

  If using **npm < 5**, Windows users can either install all the peer dependencies manually, or use the [install-peerdeps](https://github.com/nathanhleung/install-peerdeps) cli tool.

  ```sh
  npm install -g install-peerdeps
  install-peerdeps --dev @cospired/eslint-config-react
  ```

  The cli will produce and run a command like:

  ```sh
  npm install --save-dev @cospired/eslint-config-react eslint@^#.#.# eslint-plugin-import@^#.#.#
  ```

2. Add `"extends": "@cospired/eslint-config-react"` to your .eslintrc.


## Improving this config

Consider adding test cases if you're making complicated rules changes, like anything involving regexes. Perhaps in a distant future, we could use literate programming to structure our README as test cases for our .eslintrc?

You can run tests with `npm test`.

You can make sure this module lints with itself using `npm run lint`.

# Acknowledgment

This package is based on the [airbnb](https://github.com/airbnb/javascript) javascript styleguide and eslint packages.
