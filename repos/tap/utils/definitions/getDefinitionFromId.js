
/**
 * Searches the passed in definitions for one that matches the passed in id
 * @function
 * @public
 * @export
 * @param {Object} definitions - Groups of step definitions to search separated by type
 * @param {string} id - Id of the definitions to find
 * @param {string} type - Type of definitions to search
 *
 * @return {Object} - Empty noop object
 */
export const getDefinitionFromId = (definitions, id, type) => {
  definitions = type ? definitions[type] : definitions
  return !definitions || !id
    ? null
    : definitions.find(def => def.uuid === id)
}