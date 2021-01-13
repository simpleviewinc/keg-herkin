module.exports = {
  serverOptions: {
    command: 'yarn ex:start',
    port: 3000,
    protocol: 'http',
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