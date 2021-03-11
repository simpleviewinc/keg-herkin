const {
  checkCall,
  deepMerge,
  isArr,
  noOpObj,
  noPropArr,
  pickKeys
} = require('@keg-hub/jsutils')
const { groupOpts, allGroupsOpts } = require('./sharedOptionGroups')

/**
* Gets the options to launch the Playwright browser based on passed in options and config settings
* @function
* @private
* @param {string} action - Name of the task action getting the options
* @param {Object} taskOps - Task options defined in the task
* @param {Array} include - Filter to include shared options by name
* @param {Array} groups - Groups of options to include
*
* @example
* sharedOptions('start') // Returns all shared options
*
* @returns {Object} - Merged task options and shared options
*/
const sharedOptions = (action, taskOps=noOpObj, include, groups) => {
  
  const options = !isArr(groups)
    ? allGroupsOpts(action)
    : groups.reduce((joined, group) => ({
        ...joined,
        ...(checkCall(groupOpts[group], action) || noOpObj)
      }), {})

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