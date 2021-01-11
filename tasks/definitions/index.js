const { isObj, isFunc, mapObj } = require('@keg-hub/jsutils')
const { getHerkinConfig } = require('../../configs/herkin.config')

const injectHerkinConfig = (taskAction) => {
  return args => taskAction({
    ...args,
    herkin: getHerkinConfig(args.params),
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
}