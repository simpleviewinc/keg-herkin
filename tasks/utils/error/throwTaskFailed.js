
/**
 * Throws task failed error
 * @function
 * @private
 *
 * @returns {void}
 */
const throwTaskFailed = () => {
  throw new Error(`Task failed!`)
}

module.exports = {
  throwTaskFailed
}