const qawolf = require('qawolf')
const { setupTestEnvironment } = require('../bdd/support/setup')
const { Given, When, Then } = require('@cucumber/cucumber')

setupTestEnvironment()

Given("$name", async () => {
  await qawolf.create("$url")
})