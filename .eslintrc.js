module.exports = {
  "extends": [
    "plugin:jest/all",
    "eslint:recommended",
    "plugin:import/warnings",
    "plugin:import/errors"
  ],
  "plugins": ["jest"],
  "env": {
    "jest/globals": true
  },
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "rules": {
      // enable additional rules
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-console": [2, { "allow": ["warn", "error"] }],

      // jest

      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error"
  }
}
