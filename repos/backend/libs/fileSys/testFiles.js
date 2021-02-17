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
  const deleted = await removeFile(fullPath)

  return {
    fullPath,
    testPath,
    success: Boolean(deleted),
  }
}

const getTestFile = async (config, testPath) => {
  const { testsRoot } = config.paths
  const fullPath = path.join(testsRoot, testPath)

  await checkPath(fullPath)

  const [ __, content ] = await readFile(fullPath)

  return {
    content,
    fullPath,
    testPath,
  } 
}


const saveTestFile = async (config, testPath, content) => {
  const { testsRoot } = config.paths
  const fullPath = path.join(testsRoot, testPath)

  await checkPath(fullPath)

  // TODO: double check that writeFile returns a value
  const saved = await writeFile(fullPath, content)

  return {
    fullPath,
    testPath,
    success: Boolean(saved),
  }
}

module.exports = {
  deleteTestFile,
  getTestFile,
  saveTestFile
}