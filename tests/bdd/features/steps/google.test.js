const qawolf = require('qawolf')
const { defineFeature, loadFeature } = require('jest-cucumber')
const { initialize, cleanup } = require('../../../../tasks/utils/wolf/setupTestEnvironment')

const feature = loadFeature('tests/bdd/features/google.feature')

defineFeature(feature, test => {

  beforeAll(initialize)
  afterAll(cleanup)

  test('Search the web for keg-hub', async ({ given, when, then }) => {
      given(/^I open the site "(.*)"$/, async url => {
        await qawolf.create(url)
      })

      when(/^I set "(.*)" to the inputfield "(.*)"$/, (txt, field) => {
        console.log('when:', { txt, field })
      })

      when(/^I press "(.*)"$/, buttonName => {
        console.log('when press:', buttonName)
      })


      then(/^the element "(.*)" contains the text "(.*)"$/, (str, str2) => {
        console.log('then!', {str, str2})
      })
  }, 1000 * 1000 * 1000)
})

