const { dockerExec } = require('../../utils/process/process')
const { launchBrowser } = require('../../utils/playwright/launchBrowser') 

const browserMap = {
  all: `--all-browsers`,
  chrome: `--chromium`,
  firefox: `--firefox`,
  safari: `--webkit`,
  webkit: `--webkit`,
}

const buildTestArguments = (cmd=[], { browsers, context, headless, sync }) => {
  context && cmd.push(context)
  sync && cmd.unshift(`--runInBand`)
  headless && cmd.unshift(`--headless`)

  // Map the browser shortcut to the actual argument
  // If there's a context pass the browser before passing the context
  browserMap[browsers] && cmd[ context ? `unshift` : `push` ](browserMap[browsers])

  return cmd
}

const runTest = async (args) => {
  const { params } = args
  // launchBrowser({ browser: params.browsers })
  const cmd = buildTestArguments([], params)

  const resp = await dockerExec(params.container, [`npx`, `qawolf`, `test`].concat(cmd))
  
  return resp
}

module.exports = {
  run: {
    name: 'run',
    action: runTest,
    example: 'yarn test:run',
    description : 'Runs all or defined QAWolf tests',
    alias: ['test'],
    options: {
      context: {
        alias: [ 'name' ],
        description: 'Context or name of the test to be run. If not passed, all tests are run',
      },
      sync: {
        description: 'Run all tests sequentially',
        alias: [ 'runInBand' ],
        example: `--sync`,
        default: false,
      },
      browsers: {
        allowed: [ `all`, `chrome`, `firefox`, `safari`, `webkit` ],
        alias: [ 'browser' ],
        description: 'Which browsers to run the tests in',
        default: `chrome`
      },
      headless: {
        type: `bool`,
        description: 'Run the browser tests in headless mode',
        default: false,
      },
      container: {
        description: 'Name of container within which to run create command',
        example: '--container keg-herkin',
        required: true,
        default: 'keg-herkin',
      },
    }
  }
}
