
/** example playwright config that the consuming app would mount in */
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
  browsers: ['chromium', 'firefox', 'webkit'],
}