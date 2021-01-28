const qawolf = require('qawolf')
const { Given, When, Then } = require('@cucumber/cucumber')
const { initialize, cleanup } = require('../../../../tasks/utils/wolf/setupTestEnvironment')

Given(`I open the site {string}`, { timeout: -1 }, async url => {
  await initialize()
  await qawolf.create(url)
})

// When('I set {string} to the inputfield {string}', (txt, field) => {
//   console.log('when:', { txt, field })
// })

// When('I press {string}', buttonName => {
//   console.log('when press:', buttonName)
// })


// Then('the element {string} contains the text {string}', (str, str2) => {
//   console.log('then!', {str, str2})
//   cleanup()
// })