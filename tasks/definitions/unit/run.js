const path = require('path')
const { sharedOptions } = require('HerkinTasks/utils/task/sharedOptions')

/**
 * Run unit tests in container
 * @param {Object} args
 */
const runUnit = async args => {
  console.log(`---------- TODO: run unit tests ----------`)
  console.log(args.params)
}

module.exports = {
  run: {
    name: 'run',
    alias: ['test'],
    action: runUnit,
    example: 'keg herkin unit run',
    description : 'Runs unit feature tests',
    options: sharedOptions('run', {
      jestConfig: {
        default: 'configs/configs/jest.config.js'
      },
    }, null, [
      'herkin',
      'docker',
      'jest',
    ])
  }
}
