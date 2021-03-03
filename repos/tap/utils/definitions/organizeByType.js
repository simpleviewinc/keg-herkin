import { get } from '@keg-hub/jsutils'

export const organizeByType = defFileModels => {
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