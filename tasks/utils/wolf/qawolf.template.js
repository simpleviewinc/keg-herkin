const qawolf = require('qawolf')
const { Given, When, Then } = require('@cucumber/cucumber')
const { setupTestEnvironment } = require('../../tasks/utils/wolf/setupTestEnvironment')

setupTestEnvironment()

test('${name}', async () => {
  await qawolf.create('${url}')
})