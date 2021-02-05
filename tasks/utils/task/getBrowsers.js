const { eitherArr } = require('@keg-hub/jsutils')

/**
 * @param {Object} params - action/task params @see tasks/utils/tasks/sharedOptions.js
 * @return {Array<string>} - list of browsers to launch in the start task
 */
module.exports.getBrowsers = params => {
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