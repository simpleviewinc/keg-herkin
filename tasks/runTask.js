#!/usr/bin/env node
require('../configs/aliases.config').registerAliases()

const Definitions = require('./definitions')
const { argsParse } = require("@keg-hub/args-parse")
const { findTask } = require('./utils/task/findTask')
const { throwExitError } = require('./utils/error/throwExitError')
const { getKegGlobalConfig } = require('./utils/task/getKegGlobalConfig')

const defParams = { env: process.env.NODE_ENV || 'development' }

/**
 * Runs a local task matching the Keg-CLI task definitio
 * This allows the tasks to be injected into the Keg-CLI when installed
 * @param {Object} globalConfig - Global config object for the keg-cli when it exists
 *
 * @returns {Any} - Output of the executed task
 */
const runTask = async globalConfig => {
  try {
    const args = process.argv.slice(2)
    const { task, options } = findTask(Definitions, [...args])

    // Parse the args with the same package as the Keg-CLI, to ensure its consistent
    const params = await argsParse({
      task,
      args: [...args],
      params: defParams,
    })

    // Call the task action, and pass in args matching the same as the Keg-CLI args
    const response = await task.action({
      task,
      params,
      options,
      globalConfig,
      command: args[0],
      tasks: Definitions,
    })

    return response
  }
  catch(err){
    throwExitError(err)
  }
}

// Check if the parent module ( task module ) has a parent
// If it does, then it was called by the Keg-CLI
// So we should return the task definition instead of running the task action
module.parent
  ? (module.exports = { runTask })
  : (async () => {
      const globalConfig = getKegGlobalConfig(false)
      const response = await runTask(globalConfig)
      return response
    })()
