const { eitherArr } = require('@keg-hub/jsutils')
const { launchBrowser } = require('./launchBrowser')

/**
 * TODO: update this to use `jsutils.runSeq` once its released
 * Calls each promise-returning function in array `asyncFns`,
 * but awaits each before calling the next. Will pass the
 * index and resolved values of complete functions to each subsequent
 * function, in case any need them.
 * @param {Array<Function>} asyncFns 
 */
const runSeq = async (asyncFns=[]) => {
  const results = []
  for (const fn of asyncFns) {
    const result = await fn(results.length, results)
    results.push(result)
  }
  return results
}

/**
 * @param {Object} params - `start` action params
 * @return {Array<string>} - list of browsers to launch in the start task
 */
const getBrowsers = params => {
  const {
    allBrowsers,
    firefox=false,
    chromium=false,
    webkit=false,
    browsers='',
  } = params

  // get an array of browsers from the browsers string, comma or space delimited
  const browsersArr = eitherArr(browsers, browsers.split(/\s|,/gi))

  return Array.from(
    new Set([
      ...browsersArr,
      (allBrowsers || firefox) && 'firefox',
      (allBrowsers || chromium) && 'chromium',
      (allBrowsers || webkit) && 'webkit'
    ])
  ).filter(Boolean)
}

const launchBrowsers = (launchParams) => {
  const { headless, log, ...browserParams } = launchParams

  const browsers = getBrowsers(browserParams)

  // get the array of async functions for launching each chosen browser
  const launchFunctions = browsers.map(browser =>
    () => launchBrowser({
      browser,
      headless,
      log
    })
  )

  // launch each browser in a series
  return runSeq(launchFunctions)
}

module.exports = { launchBrowsers }