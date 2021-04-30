const {
  KEG_TEST_TIMEOUT,
  HERKIN_TEST_TIMEOUT,
} = process.env

const groupOpts = {
  jest: action => ({
    sync: {
      description: 'Run all tests sequentially',
      alias: [ 'runInBand' ],
      example: `${action} --sync`,
      default: false,
    },
    timeout: {
      description: 'Test timeout in milliseconds. Defaults to no timeout, so that async playwright tasks have sufficient time to complete.',
      example: `${action} --timeout 1000`,
      default: HERKIN_TEST_TIMEOUT || KEG_TEST_TIMEOUT || (5 * 1000) // 5 seconds
    },
    jestConfig: {
      description: 'Path to jest config relative to the root directory',
      example: `${action} --jestConfig relative/path/to/config`,
      required: true,
    },
    noTests: {
      description: 'The test runner will not fail when no tests exit',
      example: '${action} --noTests',
      default: false
    },
    bail: {
      description: 'Stops all tests once a single step fails',
      example: '${action} --bail',
      default: false
    },
  }),
  docker: action => ({
    container: {
      description: 'Name of container within which to run create command',
      example: '--container keg-herkin',
      default: 'keg-herkin',
    },
  }),
  herkin: action => ({
    context: {
      alias: [ 'name' ],
      description: 'Path or name of the test file to run. If not passed, all tests are run.',
      example: `${action} --context <value>`,
      default: null
    },
    log: {
      alias: [ 'lg' ],
      description: 'Log task output.',
      default: true,
      example: 'launch --no-log',
    }
  }),
  playwright: action => ({
    allBrowsers: {
      alias: [ 'all'],
      description: 'Launch all supported browsers',
      example: `${action} --all`,
    },
    chromium: {
      alias: [ 'chrome', 'chrom', 'ch' ],
      description: 'Launch Chromium browser through Playwright',
      example: `${action} --chrome`,
    },
    firefox: {
      alias: [ 'fire', 'fox', 'ff' ],
      description: 'Launch Firefox browser through Playwright',
      example: `${action} --firefox`,
    },
    webkit: {
      alias: [ 'webkit', 'safari', 'sa' ],
      description: 'Launch Safari browser through Playwright',
      example: `${action} --webkit`,
    },
    headless: {
      alias: [ 'hl' ],
      description: 'Launch the browser in headless mode',
      default: false,
      example: `${action} --no-headless`,
    },
  })
}

const allGroupsOpts = action => ({
  ...groupOpts.docker(action),
  ...groupOpts.herkin(action),
  ...groupOpts.jest(action),
  ...groupOpts.playwright(action),
})

module.exports = {
  allGroupsOpts,
  groupOpts,
}