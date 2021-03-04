const { get } = require('@keg-hub/jsutils')

/**
 * Extracts the definitions code from a definitions fileModel
 * Then organizes them by the step type ( given | then | when )
 * @param {Array} defFileModels - All loaded definition fileModels
 *
 * @return {Object} - Organized definitions code by type 
 */
const definitionsByType = defFileModels => {
  return defFileModels.reduce((organized, fileModel, idx) => {

    get(fileModel, 'ast.definitions', [])
      .map(definition => {
        if(!definition || !definition.type) return
        
        const type = definition.type.toLowerCase()
        // Store a reference to the parent fileModel to allow finding it later
        definition.parent = {
          uuid: fileModel.uuid,
          location: fileModel.location
        }

        organized[type] = organized[type] || []
        organized[type].push(definition)
      })

    return organized
  }, {})
}

module.exports = {
  definitionsByType
}