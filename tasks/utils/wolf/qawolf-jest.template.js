const qawolf = require('qawolf')
const { setupTestEnvironment } = require('@tasks/utils/wolf/setupTestEnvironment')

setupTestEnvironment()

test('${name}', async () => {
  await qawolf.create('${url}')
})