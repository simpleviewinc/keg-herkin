let __DEFINITIONS = {}

const registerDefinition = (type, matcher, method) => {
  __DEFINITIONS[type] = __DEFINITIONS[type] || {}
  __DEFINITIONS[type][matcher] = method
}

const Given = (matcher, method) => registerDefinition(`Given`, matcher, method)
const When = (matcher, method) => registerDefinition(`When`, matcher, method)
const Then = (matcher, method) => registerDefinition(`Then`, matcher, method)

const getRegistered = () => __DEFINITIONS

module.exports = {
  getRegistered,
  registerDefinition,
  Given,
  When,
  Then
}