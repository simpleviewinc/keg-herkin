const qawolf = require('qawolf')
const { Given, When, Then } = require('@cucumber/cucumber')
const { setupTestEnvironment } = require('../bdd/support/setup')

setupTestEnvironment()

test("$name", async () => {
  await qawolf.create("$url")
})