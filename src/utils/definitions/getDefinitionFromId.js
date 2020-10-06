
export const getDefinitionFromId = (definitions, id, type) => {
  definitions = type ? definitions[type] : definitions
  return !definitions || !id
    ? null
    : definitions.find(def => def.uuid === id)
}