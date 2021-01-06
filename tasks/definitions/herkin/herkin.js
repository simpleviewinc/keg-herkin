
module.exports = {
  herkin: {
    name: 'herkin',
    alias: [ 'her' ],
    example: 'herkin <sub-task> <options>',
    description : 'Runs Keg-Herkin specific tasks',
    tasks: {
      ...require('./start'),
      ...require('./launch'),
    }
  }
}
