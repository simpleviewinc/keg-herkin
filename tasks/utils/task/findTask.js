const { get, noOpArr, isArr } = require('@keg-hub/jsutils')
const { throwExitError } = require('../error/throwExitError')

const getTaskAlias = (task, tasks) => {
  return Object.entries(tasks)
    .reduce((foundTask, [name, definition]) => {

      return !foundTask && isArr(definition.alias)
        ? definition.alias.includes(task)
          ? definition
          : foundTask
        : foundTask

    }, false)
}

const loopTasks = (task, options) => {
  const opt = options.shift()
  const subTasks = task.tasks
  const subTask = opt && (subTasks[opt] || getTaskAlias(opt, subTasks))

  return !subTask
    ? { task: task, options: opt ? [ opt, ...options ] : options }
    : loopTasks(subTask, options)
}

const findTask = (tasks, options=noOpArr) => {
  const taskName = options.shift()
  const task = tasks[taskName]
  const foundTask = task && loopTasks(task, options)
  
  return foundTask && foundTask.task
    ? foundTask
    : throwExitError(new Error(`Task not found for argument: ${taskName}`))
  
}

module.exports = {
  findTask
}