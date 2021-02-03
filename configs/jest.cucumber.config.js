module.exports = {
  'moduleFileExtensions': [
    'feature',
    'js',
    'json',
    'ts',
    'tsx'
  ],
  'setupFilesAfterEnv': [
    '/keg/tap/node_modules/cucumber-jest/dist/init.js',
    '/keg/tap/tests/bdd/steps',
    '/keg/tap/tests/bdd/support/world',
    '/keg/tap/tests/bdd/support/hooks',
  ],
  'transform': {
    '^.+\\.(feature)$': 'cucumber-jest',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  'testMatch': [
    '/keg/tap/**/*.feature'
  ],
}