const { jestAliases } = require('./aliases.config')

module.exports = {
  moduleNameMapper: jestAliases,
  reporters: [
    'default',
    [ 
      './node_modules/jest-html-reporter', 
      { 
        pageTitle: 'Waypoint Test Results' ,
        outputPath: './reports/waypoint/report.html'
      }
    ]
  ],
}