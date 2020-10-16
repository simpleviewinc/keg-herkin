const { argsParse } = require("@keg-hub/args-parse")

const executeTask = (taskModule, task, name) => {
  return taskModule.parent
    ? (taskModule.exports = { [name]: task })
    : (async () => {
        const params = await argsParse({
          task,
          args: process.argv.slice(2)
        })
        await task({ params })
      })()
}

module.exports = {
  executeTask
}