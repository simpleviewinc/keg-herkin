
module.exports = {
  wolf: {
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
}