const path = require('path')
const glob = require('glob')
const { get } = require('@keg-hub/jsutils')
const { DefinitionsParser } = require('./definitionsParser')
const { TEST_UTILS_PATH } = require('HerkinBackConstants')

const loadDefinitionsFiles = stepsDir => {
  return new Promise((res, rej) => {
    glob(path.join(stepsDir, '**/*.js'), {}, async (err, files=[]) => {
      err || !files
        ? rej('No step definition files found in ' + stepsDir)
        : res(files)
    })
  })
}

const parseDefinitions = definitionFiles => {
  return definitionFiles.reduce(async (toResolve, file) => {
    const loaded = await toResolve
    if(!file) return loaded

    const definitions = await DefinitionsParser.getDefinitions(file)

    return loaded.concat(definitions)
  }, Promise.resolve([]))
}

const loadDefinitions = async config => {
  const { stepsDir, testsRoot } = config.paths
  const pathToSteps = path.join(testsRoot, stepsDir)
  const definitionFiles = stepsDir && await loadDefinitionsFiles(pathToSteps)
  const herkinDefinitionFiles = await loadDefinitionsFiles(`${TEST_UTILS_PATH}/steps`)
  const clientDefinitions = await parseDefinitions(definitionFiles) || []
  const herkinDefinitions = await parseDefinitions(herkinDefinitionFiles) || []

  // all the definition file models
  const defFileModels = clientDefinitions.concat(herkinDefinitions)
  // Reset the cached definitions
  DefinitionsParser.resetDefinitions()

  return defFileModels
}

module.exports = {
  loadDefinitions,
  loadDefinitionsFiles,
  parseDefinitions,
  DefinitionsParser,
}