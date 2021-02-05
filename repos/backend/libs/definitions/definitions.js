const path = require('path')
const glob = require('glob')
const { DefinitionsParser } = require('./definitionsParser')

const loadDefinitionsFiles = (definitionsFolder) => {
  return new Promise((res, rej) => {
    glob(path.join(definitionsFolder, '**/*.js'), {}, async (err, files=[]) => {
      err || !files
        ? rej('No definition files found in ' + definitionsFolder)
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
  const { stepsFolder } = config.paths
  const definitionFiles = stepsFolder && await loadDefinitionsFiles(stepsFolder)
  const definitions = await parseDefinitions(definitionFiles) || []

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