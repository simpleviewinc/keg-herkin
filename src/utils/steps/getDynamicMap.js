
/**
 * Finds the child type and formats it in the proper type to be rendered
 * @param {Object} definition - Step definition into an object
 *
 * @returns {Object} - built dynamic map for a feature scenario step
 */
export const getDynamicMap = (definition) => {
  return definition.tokens.reduce((dynamicMap, token) => {
    token.dynamic && (dynamicMap[token.index] = '')

    return dynamicMap
  }, {})
  
}