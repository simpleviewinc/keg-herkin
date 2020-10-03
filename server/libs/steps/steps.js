const path = require('path')
const glob = require('glob')
const { StepParser } = require('./stepParser')

const loadStepFiles = (stepsFolder) => {
  return new Promise((res, rej) => {
    glob(path.join(stepsFolder, '**/*.js'), {}, async (err, files=[]) => {
      err || !files
        ? rej('No step files found in ' + stepsFolder)
        : res(files)
    })
  })
}

const parseSteps = (stepFiles) => {
  return stepFiles.reduce(async (toResolve, file) => {
    const loaded = await toResolve
    if(!file) return loaded

    const steps = await StepParser.getSteps(file)

    return loaded.concat(steps)
  }, Promise.resolve([]))
}

const loadSteps = async config => {
  const { stepsFolder } = config.editor
  const stepFiles = stepsFolder && await loadStepFiles(stepsFolder)

  return parseSteps(stepFiles)
}

module.exports = {
  loadSteps,
  loadStepFiles,
  parseSteps,
  StepParser,
}