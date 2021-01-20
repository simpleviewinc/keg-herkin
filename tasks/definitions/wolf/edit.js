const { dockerExec } = require('../../utils/process/process')
const { launchBrowser } = require('../../utils/playwright/launchBrowser') 

/**
 * Executes and times the function `fn`.
 * @param {Function} fn 
 * @return {Array<*, number>} [ fn output, execution time in ms ]
 * @example
 * const [ result, executionTime ] = timedRun(() => http.get(url)))
 */
const timedRun = async (fn, ...args) => {
  if (!fn) return [ undefined, -1 ]
  const startTime = new Date()
  const result = await fn(...args)
  return [
    result,
    new Date() - startTime
  ]
}

/**
 * Runs the edit command, and logs out a warning if
 * the user forgot to include `qawolf.create` in their 
 * test file.
 * @param {string} containerName 
 * @param {string} testName 
 * @param {number} expectedMinTime 
 * @return {*} result of dockerExec
 */
const runEditCmd = async (containerName, testName, expectedMinTime=10000) => {
  const [ exitCode, duration ] = await timedRun(dockerExec, containerName, `npx qawolf edit ${testName}`)
  if (exitCode === 0 && duration < expectedMinTime)
    console.log(
      '\x1b[35m%s\x1b[0m', 
      'The edit process completed quickly! You may have forgotten to mark the edit location in your test file with `await qawolf.create()`'
    )
  return exitCode
}

const editTest = async (args) => {
  const { params } = args
  const { context } = params

  // ensure a non-headless chromium instance is running
  await launchBrowser({ browser: 'chromium', headless: false })

  runEditCmd(params.container, context)
}

module.exports = {
  edit: {
    name: 'edit',
    action: editTest,
    example: 'yarn test:edit',
    description : 'Edit an existing test based on the passed in context',
    options: {
      context: {
        alias: [ 'name' ],
        description: 'Context or name of the test to be edit',
        required: true,
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
