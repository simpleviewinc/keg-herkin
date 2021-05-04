const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()
//const { get } = require('@keg-hub/jsutils')

/**
 * Sets the file to a file input field
 * @param {string} selector
 * @param {string} filePath 
 * @param {Object} world 
 */
const fileUpload = async (selector, filePath, world) => {
  const page = await getPage()
  const handle = await page.$(selector)
  //constricting file path to /tests/bdd/support folder
  const assetsFolder = "/keg/tap/tests/bdd/support"
  const fullFilePath = (filePath.startsWith('/') ? assetsFolder + filePath : assetsFolder + '/' + filePath)
  await handle.setInputFiles(fullFilePath)
}

When('the file input {string} uploads the file {string}', fileUpload, {
    description: 'Uploads a file to an input[type=file] field.\n\nModule : fileUpload',
    expressions: [
      {
        type: 'string',
        description: 'File input selector.\nIf there is only one file input in the DOM, simply pass "input[type=file]".\nIf there are multiple file inputs, add a more targeted selector.',
        example: 'input[type=file]',
      },
      {
        type: 'string',
        description: 'Path to the file inside the docker container\'s mounted /support/ folder.  Include a leading forward-slash in the path.\n\nExample :\nWhen the file input "input[type=file]" uploads the file "/assets/app_builds/apk/my_android_test_app.apk"',
        example: '/assets/app_builds/apk/my_android_test_app.apk',
      }
    ]
})

module.exports = { fileUpload }

