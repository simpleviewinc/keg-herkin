const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Simply waits `num` seconds before continuing to next step
 * @param {number} num - number of seconds
 */
const wait = async (num) => {
  const page = await getPage()
  return await page.waitForTimeout(num * 1000);
}

When('I wait {int} second(s)', wait, {
  description: `Wait for given amount of time, in seconds, before proceeding to the next step.\nCannot exceed 5 seconds.

Module : wait`,
  expressions: [
    {
      example: 5,
      type: 'int',
      description: `Amount of time to wait in seconds.

Example : When I wait 5 seconds`,
    }
  ]
})

module.exports = { wait }
