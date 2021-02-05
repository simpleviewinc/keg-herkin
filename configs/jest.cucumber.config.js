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
    '/keg/tap/cucumber/steps',
    '/keg/tap/cucumber/support/world',
    '/keg/tap/cucumber/support/hooks',
  ],
  'transform': {
    '^.+\\.(feature)$': 'cucumber-jest',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  'testMatch': [
    '/keg/tap/**/*.feature'
  ],
}