const path = require('path')
const glob = require('glob')
const { get } = require('@keg-hub/jsutils')
const { DefinitionsParser } = require('./definitionsParser')
const { TEST_UTILS_PATH } = require('HerkinBackConstants')

const loadDefinitionsFiles = stepsDir => {
  return new Promise((res, rej) => {
    // TODO: Investigate if it's better to include the ignore
    // Would make loading the definitions faster, but
    // Would mean users can't use index files
    // Would look like this { ignore: [ '**/index.js' ] }
    // For the section argument passed to the glob pattern
    
    glob(path.join(stepsDir, '**/*.js'), {}, async (err, files=[]) => {
      err || !files
        ? rej('No step definition files found in ' + stepsDir)
        : res(files)
    })
  })
}

const parseDefinitions = (definitionFiles, config) => {
  return definitionFiles.reduce(async (toResolve, file) => {
    const loaded = await toResolve
    if(!file) return loaded

    const fileModel = await DefinitionsParser.getDefinitions(file, config)
    loaded.push(fileModel)

    return loaded
  }, Promise.resolve([]))
}

const loadDefinitions = async config => {
  // Clear out any steps that were already loaded
  DefinitionsParser.clear()

  const { stepsDir, testsRoot } = config.paths
  const pathToSteps = path.join(testsRoot, stepsDir)
  const definitionFiles = stepsDir && await loadDefinitionsFiles(pathToSteps)
  const herkinDefinitionFiles = await loadDefinitionsFiles(`${TEST_UTILS_PATH}/steps`)
  const clientDefinitions = await parseDefinitions(definitionFiles) || []
  const herkinDefinitions = await parseDefinitions(herkinDefinitionFiles) || []

  // all the definition file models
  return clientDefinitions.concat(herkinDefinitions)
}

module.exports = {
  loadDefinitions,
  loadDefinitionsFiles,
  DefinitionsParser,
}