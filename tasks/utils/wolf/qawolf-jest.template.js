const qawolf = require('qawolf')
const { setupTestEnvironment } = require('HerkinTasks/utils/wolf/setupTestEnvironment')

setupTestEnvironment()

test('${name}', async () => {
  await qawolf.create('${url}')
})