import { get } from '@keg-hub/jsutils'

export const organizeByType = defFileModels => {
  return defFileModels.reduce((organized, fileModel) => {

    get(fileModel, 'ast.definitions', [])
      .map(definition => {
        if(!definition || !definition.type) return
        
        const type = definition.type.toLowerCase()
        organized[type] = organized[type] || []
        organized[type].push(definition)
      })

    return organized
  }, {})
}