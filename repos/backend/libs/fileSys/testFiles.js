const path = require('path')
const { readFile, removeFile, writeFile, pathExists } = require('./fileSys')

/**
 * Checks that the file path exists
 * @param {String} path - file path to check
 * @throw {Error} if path not found on file system
 */
const checkPath = async (path) => {
  const [ err, exists ] = await pathExists(path)
  if (err || !exists) {
    const pathError = new Error(`[API - Files] Path not found: ${path}`)
    pathError.status = 404
    throw pathError
  }
}

const deleteTestFile = async (config, testPath) => {
  const { testsRoot } = config.paths
  const fullPath = path.join(testsRoot, testPath)

  await checkPath(fullPath)

  // TODO: double check that removeFile returns a value
  const [__, deleted] = await removeFile(fullPath)

  return {
    fullPath,
    testPath,
    success: Boolean(deleted),
  }
}

const getTestFile = async (config, testPath) => {

  const { testsRoot } = config.paths
  const fullPath = testPath.includes(testsRoot)
    ? testPath
    : path.join(testsRoot, testPath)

  await checkPath(fullPath)

  const [ __, content ] = await readFile(fullPath)

  return {
    content,
    fullPath,
    testPath,
  } 
}

/**
 * Save file at a given location. file should be located in the test root path
 * @param {Object} config 
 * @param {string} fullPath
 * @param {string} content 
 */
const saveTestFile = async (config, fullPath, content) => {

  const { testsRoot } = config.paths
  const inTestRoot = fullPath.startsWith(testsRoot)
  if (!inTestRoot) throw new Error(`[API - Files] Filepath must have rootPath '${testsRoot}': received '${fullPath}'`)

  const [err, success] = await writeFile(fullPath, content)

  if (err) {
    console.log(err)
    const pathError = new Error(`[API - Files] Save failed: ${fullPath} - ${err.message}`)
    pathError.status = 404
    throw pathError
  }

  return {
    fullPath,
    fileName: path.basename(fullPath),
    success: Boolean(success),
  }
}

module.exports = {
  deleteTestFile,
  getTestFile,
  saveTestFile
}