module.exports = {
  cucumber: {
    name: 'cucumber',
    alias: [ 'cmbr', 'cr', ],
    description: 'Runs cucumber-specific tasks',
    example: 'cr <sub-task> <options>',
    tasks: {
      ...require('./run'),
    }
  }
}