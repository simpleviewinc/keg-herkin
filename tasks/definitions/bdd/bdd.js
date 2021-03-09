module.exports = {
  bdd: {
    name: 'bdd',
    alias: [ 'cucumber', 'cmbr', 'cr', 'feature' ],
    description: 'Runs BDD features tasks',
    example: 'bdd <sub-task> <options>',
    tasks: {
      ...require('./run'),
    }
  }
}