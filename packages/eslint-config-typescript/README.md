[![Build Status](https://travis-ci.com/cospired/javascript.svg?branch=master)](https://travis-ci.com/cospired/javascript)

# @cospired/eslint-config-typescript

This package provides cospired's base typescript .eslintrc (without React plugins) as an extensible shared config.

## Usage

We export one ESLint configurations for your usage.

### @cospired/eslint-config-typescript

Our default export contains all of our ESLint rules, including ECMAScript 6+. It requires `eslint`, `eslint-plugin-eslint-comment`, `eslint-plugin-import` and `@hapi/eslint-plugin-hapi`.

If you use yarn, run `npm info "@cospired/eslint-config-typescript@latest" peerDependencies` to list the peer dependencies and versions, then run `yarn add --dev <dependency>@<version>` for each listed peer dependency. See below for npm instructions.

1. Install the correct versions of each package, which are listed by the command:

  ```sh
  npm info "@cospired/eslint-config-typescript@latest" peerDependencies
  ```

  If using **npm 5+**, use this shortcut

  ```sh
  npx install-peerdeps --dev @cospired/eslint-config-typescript
  ```

  If using **npm < 5**, Linux/OSX users can run

  ```sh
  (
    export PKG=@cospired/eslint-config-typescript;
    npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
  )
  ```

  Which produces and runs a command like:

  ```sh
    npm install --save-dev @cospired/eslint-config-typescript eslint@^#.#.# eslint-plugin-import@^#.#.#
  ```

  If using **npm < 5**, Windows users can either install all the peer dependencies manually, or use the [install-peerdeps](https://github.com/nathanhleung/install-peerdeps) cli tool.

  ```sh
  npm install -g install-peerdeps
  install-peerdeps --dev @cospired/eslint-config-typescript
  ```

  The cli will produce and run a command like:

  ```sh
  npm install --save-dev @cospired/eslint-config-typescript eslint@^#.#.# eslint-plugin-import@^#.#.#
  ```

2. Add `"extends": "@cospired/eslint-config-typescript"` to your .eslintrc.


## Improving this config

Consider adding test cases if you're making complicated rules changes, like anything involving regexes. Perhaps in a distant future, we could use literate programming to structure our README as test cases for our .eslintrc?

You can run tests with `npm test`.

You can make sure this module lints with itself using `npm run lint`.

# Acknowledgment

This package is based on the [airbnb](https://github.com/airbnb/javascript) javascript styleguide and eslint packages and [eslint-config-airbnb-typescript](https://github.com/iamturns/eslint-config-airbnb-typescript) typescript extension.
