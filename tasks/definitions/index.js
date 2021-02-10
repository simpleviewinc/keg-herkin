const { isObj, isFunc, mapObj, pipeline } = require('@keg-hub/jsutils')
const { getHerkinConfig } = require('@configs/getHerkinConfig')
const { validateConfig } = require('@tasks/utils/validation')

const getValidConfig = params => {
  return pipeline(
    params,
    getHerkinConfig,
    validateConfig
  )
}

const injectHerkinConfig = taskAction => {
  return args => taskAction({
    ...args,
    herkin: getValidConfig(args.params)
  })
}

const initialize = tasks => {
  mapObj(tasks, (key, task) => {
    task.action = isFunc(task.action) && injectHerkinConfig(task.action)
    task.tasks = isObj(task.tasks) && initialize(task.tasks)
  })

  return tasks
}

module.exports = {
  ...initialize(require('./tap')),
  ...initialize(require('./wolf')),
  ...initialize(require('./cucumber')),
}