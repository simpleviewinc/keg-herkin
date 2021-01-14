module.exports = {
  serverOptions: {
    // start up the example app before running tests
    command: 'yarn ex:start',
    port: 3000,
    protocol: 'http',
    host: 'localhost',
    usedPortAction: 'kill',
    launchTimeout: 60000
  },
  launchOptions: {
    headless: true
  },
  contextOptions: {
    ignoreHTTPSErrors: true,
    viewport: {
      width: 1920,
      height: 1080
    }
  },
  browsers: ['chromium', 'firefox', 'webkit'],
}