const {
  deepMerge,
  isArr,
  noOpObj,
  noOpArr,
  pickKeys
} = require('@keg-hub/jsutils')

/**
* Gets the options to launch the Playwright browser based on passed in options and config settings
* @function
* @private
* @param {string} action - Name of the task action getting the options
* @param {Object} taskOps - Task options defined in the task
* @param {Array} include - Filter to include shared options by name
*
* @example
* sharedOptions('start') // Returns all shared options
*
* @returns {Object} - Merged task options and shared options
*/
const sharedOptions = (action, taskOps=noOpObj, include=noOpArr) => {
  const options = {
    browsers: {
      allowed: [ `all`, `chromium`, `firefox`, `safari`, `webkit` ],
      alias: [ 'browser' ],
      description: 'Which browsers to run the tests in. Only valid in headless mode.',
      default: `chromium`,
      example: `${action} --browsers chromium`,
    },
    chromium: {
      alias: [ 'chrome', 'chrom', 'ch' ],
      description: 'Launch Chromium browser through Playwright',
      example: `${action} --chrome`,
    },
    firefox: {
      alias: [ 'fire', 'fox', 'ff' ],
      description: 'Launch Firefox browser through Playwright',
      example: `${action} --firefox`,
    },
    webkit: {
      alias: [ 'webkit', 'safari', 'sa' ],
      description: 'Launch Safari browser through Playwright',
      example: `${action} --webkit`,
    },
    headless: {
      alias: [ 'hl' ],
      description: 'Launch the browser in headless mode',
      default: false,
      example: `${action} --no-headless`,
    },
    log: {
      alias: [ 'lg' ],
      description: 'Log task output.',
      default: true,
      example: 'launch --no-log',
    }
  }

  const addOpts = isArr(include)
    ? pickKeys(options, include)
    : options

  // taskOps is merged twice to ensure key order, then priority
  return deepMerge(
    taskOps,
    addOpts,
    taskOps
  )

}


module.exports = {
  sharedOptions
}