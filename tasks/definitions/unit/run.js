const runUnit = async args => {
  console.log(`---------- run unit tests ----------`)

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
