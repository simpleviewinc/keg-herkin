#!/usr/bin/env node


const { executeTask } = require('../helpers/executeTask')

// TODO: update to call the tests/playwright/server.js script on the host machine
// Remove the `launchBrowser` dependency from package.json
const launchBr = async (args) => {
  console.log(`TODO: update to call the tests/playwright/server.js script on the host machine`)
}

const launch = {
  name: 'launch',
  action: launchBr,
  example: 'yarn test:launch',
  description : 'Launch a locally installed browser to use as a proxy',
  options: {
    context: {
      alias: [ 'name' ],
      allowed: [ `chrome`, `firefox`, `safari`, `webkit` ],
      description: 'Context or name of the browser to launch',
      default: 'chrome',
    },
  }
}

executeTask(module, launch, launch.name)
