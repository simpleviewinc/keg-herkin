const { checkCall } = require('@keg-hub/jsutils')
const { argsParse } = require("@keg-hub/args-parse")
const { getKegGlobalConfig } = require('./getKegGlobalConfig')

/**
 * Executes the passed in task if it's called directly, otherwise added it to the module.exports object
 * <br/> This allows it to be dynamically loaded by the Keg-CLI
 * @param {Object} taskModule - module of the task to be run
 * @param {Object} task - Task definition object
 * @param {string} name - Name of the task to be run
 *
 * @return {Object|*} - The module of the task, or the response from the task action when called
 */
const executeTask = (taskModule, task, name) => {
  return taskModule.parent
    ? (taskModule.exports = { [name]: task })
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
          globalConfig: getKegGlobalConfig(false)
        })

      })()
}

module.exports = {
  executeTask
}