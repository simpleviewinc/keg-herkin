const { npx } = require('../../utils/process/process')
const { sharedOptions } = require('../../utils/task/sharedOptions')

const browserMap = {
  all: `--all-browsers`,
  chrome: `--chromium`,
  firefox: `--firefox`,
  safari: `--webkit`,
  webkit: `--webkit`,
}

const startTests = async (args) => {
  const { params } = args
  const cmd = buildTestArguments([], params)

  const resp = await npx([`qawolf`, `test`].concat(cmd))
  
  return resp
}

module.exports = {
  start: {
    name: 'start',
    action: startTests,
    example: 'test:start',
    description : 'Starts all services. (Local Webserver and Docker Container)',
    options: {

    }
  }
}
