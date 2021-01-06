const { executeTask } = require('../utils/task/executeTask')

const wolf = {
  name: 'wolf',
  alias: [ 'wf' ],
  description: 'Runs QAWolf specific tasks',
  example: 'wolf <sub-task> <options>',
  tasks: {
    ...require('./create'),
    ...require('./edit'),
    ...require('./run'),
  }
}

module.exports = executeTask(wolf)