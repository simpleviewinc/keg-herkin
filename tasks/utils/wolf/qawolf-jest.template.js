const qawolf = require('qawolf')
const { setupTestEnvironment } = require('HerkinRepos/testUtils/playwright/setupTestEnvironment')

setupTestEnvironment()

test('${name}', async () => {
  await qawolf.create('${url}')
})