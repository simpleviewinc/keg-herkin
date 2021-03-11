module.exports = {
  unit: {
    name: 'unit',
    alias: [ 'jest' ],
    description: 'Runs unit test tesks',
    example: 'unit <sub-task> <options>',
    tasks: {
      ...require('./run'),
    }
  }
}