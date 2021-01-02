
/**
 * Modules that should be transpiled before the tests are run
 */
const transpileForTests = [
].join('|')

module.exports = {
  rootDir: '../',
  preset: "rollup-jest",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.js?(x)"
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}"
  ],
  coverageDirectory: "reports/coverage",
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "es6"
  ],
  globals: {
    "__DEV__": true
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: [ `node_modules/(?!(${transpileForTests})/)` ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/mocks"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/scripts/setupTests.js"
  ]
}