const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Simply waits `num` seconds before continuing to next step
 * @param {number} num 
 */
const wait = async (num) => {
  //return new Promise(res => setTimeout(res, num * 1000))
  const page = await getPage()
  return await page.waitForTimeout(num * 1000);
}

When('I wait {int} second(s)', wait, {
  description: 'Wait for given amount of time, in seconds, before proceeding to the next step.\nCannot exceed 5 seconds.\n\nModule : wait',
  expressions: [
    {
      example: 5,
      type: 'int',
      description: 'Amount of time to wait in seconds.\n\n Example : When I wait 5 seconds',
    }
  ]
})

module.exports = { wait }
