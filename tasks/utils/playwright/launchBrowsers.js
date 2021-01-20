const { eitherArr } = require('@keg-hub/jsutils')
const { launchBrowser } = require('./launchBrowser')

const runSeq = async (asyncFns=[]) => {
  const results = []
  for (const fn of asyncFns) {
    const result = await fn()
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
    firefox=false,
    chromium=false,
    webkit=false,
    browsers,
  } = params


  const browsersArr = eitherArr(browsers, browsers.split(/\s|,/gi))

  return Array.from(
    new Set([
      ...browsersArr,
      firefox && 'firefox',
      chromium && 'chromium',
      webkit && 'webkit'
    ])
  ).filter(Boolean)
}

module.exports.launchBrowsers = launchParams => {
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

  // launch each browser sequentially
  return runSeq(launchFunctions)
}