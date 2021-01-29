const qawolf = require('qawolf')
const { defineFeature, loadFeature } = require('jest-cucumber')
const { initialize, cleanup } = require('../../../../tasks/utils/wolf/setupTestEnvironment')

const feature = loadFeature('${feature}')

defineFeature(feature, test => {
  beforeAll(initialize)
  afterAll(cleanup)

  ${body}
}, ${timeout})

