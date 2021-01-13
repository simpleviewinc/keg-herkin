const path = require('path')
const { readFile, removeFile, writeFile } = require('./fileSys')

const deleteTestFile = async (config, testPath) => {
  const { testsFolder } = config.editor
  const fullPath = path.join(testsFolder, testPath)

  // TODO: double check that removeFile returns a value
  const deleted = await removeFile(fullPath)

  return {
    fullPath,
    testPath,
    success: Boolean(deleted),
  }
}

const getTestFile = async (config, testPath) => {
  const { testsFolder } = config.editor
  const fullPath = path.join(testsFolder, testPath)

  const [ , content ] = await readFile(fullPath)

  return {
    content,
    fullPath,
    testPath,
  } 
}

const saveTestFile = async (config, testPath, content) => {
  const { testsFolder } = config.editor
  const fullPath = path.join(testsFolder, testPath)

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