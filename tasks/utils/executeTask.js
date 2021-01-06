const { checkCall } = require('@keg-hub/jsutils')
const { argsParse } = require("@keg-hub/args-parse")
const { getKegGlobalConfig } = require('./getKegGlobalConfig')
const { getHerkinConfig } = require('../../configs/herkin.config')

/**
 * Executes the passed in task if it's called directly, otherwise added it to the module.exports object
 * <br/> This allows it to be dynamically loaded by the Keg-CLI
 * @param {Object} task - Task definition object
 *
 * @return {Object|*} - The module of the task, or the response from the task action when called
 */
const executeTask = task => {
  // Check if the parent module ( task module ) has a parent
  // If it does, then it was called by the Keg-CLI
  // So we should return the task definition instead of running the task action
  return module.parent && module.parent.parent
    ? { [task.name]: task }
    : (async () => {

        const options = process.argv.slice(2)
        const params = await argsParse({
          task,
          args: process.argv.slice(2)
        })

        // Call the task action, and pass in args matching the same as the Keg-CLI args
        return await checkCall(task.action, {
          task,
          params,
          options,
          herkin: getHerkinConfig(params),
          globalConfig: getKegGlobalConfig(false)
        })

      })()
}

module.exports = {
  executeTask
}