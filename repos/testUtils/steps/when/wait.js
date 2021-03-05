const { When } = require('HerkinParkin')

/**
 * Simply waits `num` seconds before continuing to next step
 * @param {number} num 
 */
const wait = num => {
  return new Promise(res => setTimeout(res, num * 1000))
}

When('I wait {int} second(s)', wait)

module.exports = { wait }
