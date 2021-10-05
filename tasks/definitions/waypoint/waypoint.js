
module.exports = {
  waypoint: {
    name: 'waypoint',
    alias: [ 'wpt', 'waypoint', 'way', 'wp' ],
    description: 'Runs waypoint specific tasks',
    example: 'waypoint <sub-task> <options>',
    tasks: {
      ...require('./create'),
      ...require('./edit'),
      ...require('./run'),
    }
  }
}