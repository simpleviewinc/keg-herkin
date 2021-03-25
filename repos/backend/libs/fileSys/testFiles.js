const path = require('path')
const { validFilename, wordCaps } = require('@keg-hub/jsutils')
const { loadTemplate } = require('../../templates/loadTemplate')
const { buildFileModel } = require('../../utils/buildFileModel')
const { resolveReportAst } = require('../../utils/resolveReportAst')

const {
  readFile,
  removeFile,
  writeFile,
  mkDir,
  pathExists,
} = require('./fileSys')


/**
 * Checks that the file path exists
 * @param {String} location - file path to check
 * @throw {Error} if location not found on file system
 */
const checkPath = async location => {
  const [ err, exists ] = await pathExists(location)
  if (err || !exists) {
    const pathError = new Error(`[API - Files] Path not found: ${location}`)
    pathError.status = 404
    throw pathError
  }
}

/**
 * Deletes a file at a given location. file should be located in the test root path
 * @param {Object} config - Herkin server config
 * @param {string} location - Location within the test root path the file should be deleted
 *
 * @returns {Object} - Contains boolean if delete was successful and its location
 */
const deleteTestFile = async (config, location) => {
  const { testsRoot } = config.paths
  await checkPath(location)

  // TODO: double check that removeFile returns a value
  const [__, deleted] = await removeFile(location)

  return {
    location,
    success: Boolean(deleted),
  }
}

/**
 * Checks the files path and if it exists creates a fileModel from the meta data 
 * @param {Object} config - Herkin server config
 * @param {string} location - Location within the test root path the file should exist
 *
 * @returns {Object} - fileModel for the file at the passed in location
 */
const getTestFile = async (config, location) => {

  const { testsRoot, reportsDir } = config.paths
  const fullPath = location.startsWith(testsRoot)
    ? location
    : path.join(testsRoot, location)

  await checkPath(fullPath)

  // If it's a report file, then need to build the report ast meta data
  const reportContent = resolveReportAst(fullPath, testsRoot, reportsDir)
  // If not report ast is returned, then get the file content
  // Reports get loaded as HTML, so we don't need to the file content
  const [ _, content ] = !reportContent.ast
    ? await readFile(fullPath)
    : []

  // Build the file model for the test file
  return buildFileModel({
    content,
    location: fullPath,
    ...reportContent,
  })
}

/**
 * Save file at a given location. file should be located in the test root path
 * @param {Object} config - Herkin server config
 * @param {string} location - Location within the test root path the file should be saved
 * @param {string} content - Content of the file to be saved
 *
 * @returns {Object} - Contains boolean if save was successful and its fileModel
 */
const saveTestFile = async (config, location, content) => {

  const { testsRoot } = config.paths

  const inTestRoot = location.startsWith(testsRoot)
  if (!inTestRoot) throw new Error(`[API - Files] File must be saved to the mounted test folder!`)

  const [err, success] = await writeFile(location, content)

  if (err) {
    console.log(err)
    const pathError = new Error(`[API - Files] Save failed: ${location} - ${err.message}`)
    pathError.status = 404
    throw pathError
  } 
  return {
    success: Boolean(success),
    file: await buildFileModel({
      content,
      location,
    })
  }
}

/**
 * Create a file based on location and fileName
 * Only saved within the docker mounted test root path
 * @param {Object} config - Herkin server config
 * @param {string} fileName - Name / Location of the file to be saved
 * @param {string} fileType - The type of file to be saved, one of the TEST_TYPES constants
 *
 * @returns {Object} - Contains boolean if create was successful and its fileModel
 */
const createTestFile = async (config, fileName, fileType) => {
  const { testTypes } = config
  const foundType = testTypes[fileType]

  // Ensure the test type exists
  // If not, then we can't create the file
  if(!foundType)
    throw new Error(
      `[API - Files] Invalid test type "${fileType}"`,
      `Must be one of ${Object.keys(testTypes)}`
    )

  // Build the path to the file and it's meta data
  const location = path.join(foundType.location, fileName)
  
  // Check if the path already exists, so we don't overwrite an existing file
  const [ existsErr, fileExists ] = await pathExists(location)
  if(fileExists) throw new Error(`File already exists at that location!`)

  const basename = path.basename(location)
  const dirname = path.dirname(location)

  // Ensure the directory exists for the file
  const [mkDirErr, mkDirSuccess] = await mkDir(dirname)
  if(mkDirErr) throw new Error(mkDirErr)

  // Create the new test file using the template for the file type
  // In the future we might want to allow custom templates from the mounted tests folder 
  // But that's a lot more work
  const content = await loadTemplate(fileType, {
    name: wordCaps(basename.split('.').shift())
  })

  const [writeErr, writeSuccess] = await writeFile(location, content)
  if(writeErr) throw new Error(writeErr)

  return {
    success: Boolean(writeSuccess),
    // Build the file model for the new test file
    file: await buildFileModel({
      content,
      fileType,
      location,
    })
  }
}

module.exports = {
  createTestFile,
  deleteTestFile,
  getTestFile,
  saveTestFile
}