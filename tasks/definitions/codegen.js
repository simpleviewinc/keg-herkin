const { runCmd } = require('../utils/process/process')

/**
* Generates playwright code for browser interactions on the specified url.
* @function
* @private
* @param {Object} args - Task arguments
*/
const codegen = async (args) => {
  const { params } = args
  console.log(params)
  process.exit()
  const { url } = params
  return runCmd('npx', [ 'playwright', 'codegen', url ])
}

module.exports = {
  codegen: {
    name: 'codegen',
    alias: [ 'cg' ],
    action: codegen,
    example: 'keg herkin codegen --url localhost:3000',
    options: {
      url: {
        description: 'url to interact with',
        required: true,
      } 
    }
  } 
}
