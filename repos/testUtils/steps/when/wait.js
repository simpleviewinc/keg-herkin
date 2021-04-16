const { When } = require('HerkinParkin')

/**
 * Simply waits `num` seconds before continuing to next step
 * @param {number} num 
 */
const wait = num => {
  return new Promise(res => setTimeout(res, num * 1000))
}

When('I wait {int} second(s)', wait, {
  description: 'Wait for given amount of time before proceeding to the next step.',
  expressions: [
    {
      example: 5,
      type: 'int',
      description: 'Amount of time to wait in seconds',
    }
  ]
})

module.exports = { wait }
