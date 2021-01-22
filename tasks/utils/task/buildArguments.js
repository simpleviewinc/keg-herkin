const { mapObj, exists } = require('@keg-hub/jsutils')

/**
 * Builds cli arguments. Appends `--` if key doesn't already have it
 * @param {Object} params 
 * 
 * @returns {Array<string>} - array of cli args
 */
const buildArguments = (params) => {

  const array = mapObj(params, (key, value) => {
    // if value is null/undefined, don't create a string for it
    return exists(value)
      ? !key.match('^--')
        ? `--${key} ${value}`
        : `${key} ${value}`
      : null
  }) || []
  
  return array.filter(Boolean)
}

module.exports = {
  buildArguments
}
