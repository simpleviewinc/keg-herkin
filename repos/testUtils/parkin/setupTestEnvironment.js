const { parkin } = require('./instance')
const { HERKIN_FEATURE_NAME, HERKIN_FEATURE_TAGS } = process.env
/**
 * Global helper to allow re-using the same parking instance for each test
 */
global.getParkinInstance = () => parkin

/**
 * TODO: build dynamic options based on the current env
 * Most likely will need to use process.env to pass in options
 * Need a way to get the name, and tags options passed here
 * const { HERKIN_FEATURE_NAME, HERKIN_FEATURE_TAGS } = process.env
 */
global.getParkinOptions = () => {
  return {
    ...(HERKIN_FEATURE_NAME && { name: HERKIN_FEATURE_NAME }),
    ...(HERKIN_FEATURE_TAGS && { tags: HERKIN_FEATURE_TAGS })
  }
}
