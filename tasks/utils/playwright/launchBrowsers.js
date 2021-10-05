const { launchBrowser } = require('./launchBrowser')
const { getBrowsers } = require('HerkinTasks/utils/task/getBrowsers')
const { runSeq, noOpObj } = require('@keg-hub/jsutils')
const { checkShouldUseVNC } = require('../envs/checkShouldUseVNC')

/**
 * @param {Object} params 
 * @return {boolean} true if the params has specified at least one browser
 */
const hasBrowserSpecified = params => {
  const browsers = [
    'webkit',
    'firefox',
    'chromium',
    'allBrowsers'
  ]
  return Object
    .keys(params)
    .some(key => browsers.includes(key) && params[key])
}

/**
 * @param {Object} params 
 * @return {Object} updated params with default values
 */
const paramsWithDefaults = params => ({
  ...params,

  // ensure at least chromium is launched, if user did not specify any browser
  chromium: hasBrowserSpecified(params) 
    ? params.chromium
    : true
})

/**
 * 
 * @param {Object} launchParams - params for launching, including sharedOptions.js values
 * @return {Object} - {
 *   output: an array of the result of each browser launch,
 *   browsers: the browsers that were launched
 * }
 */
const launchBrowsers = ({ launch, herkinTestsRun, ...launchParams  }) => {
  // Check if we should use VNC instead of launching the browser via websocket
  // The herkinTestsRun prop should be be sent when actually running tests
  const shouldUseVNC = checkShouldUseVNC(!launch && !herkinTestsRun)
  if(shouldUseVNC) return noOpObj

  const { headless, log, ...browserParams } = paramsWithDefaults(launchParams)

  const browsers = getBrowsers(browserParams)

  // get the array of async functions for launching each chosen browser
  const launchFunctions = browsers.map(browser =>
    () => launchBrowser({
      ...browserParams,
      browser,
      headless,
      log
    })
  )

  // launch each browser in a series
  const output = runSeq(launchFunctions)

  return {
    output,
    browsers
  }
}

module.exports = { launchBrowsers }