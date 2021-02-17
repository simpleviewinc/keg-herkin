const path = require('path')
const glob = require('glob')
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

  // all the definitions
  const definitions = clientDefinitions.concat(herkinDefinitions)

  // Reset the cached definitions
  DefinitionsParser.resetDefinitions()
  
  return definitions.reduce((organized, definition) => {
    if(!definition || !definition.type) return organized
    
    const type = definition.type.toLowerCase()
    organized[type] = organized[type] || []
    organized[type].push(definition)

    return organized
  }, {})
}

module.exports = {
  loadDefinitions,
  loadDefinitionsFiles,
  parseDefinitions,
  DefinitionsParser,
}