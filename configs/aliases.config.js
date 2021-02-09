const moduleAlias = require('module-alias')
const tapRoot = require('app-root-path').path
const { deepFreeze } = require('@keg-hub/jsutils')

// aliases shared by jest and module-alias
const aliases = deepFreeze({
  "@root": tapRoot,
  "@repos": `${tapRoot}/repos`,
  "@configs": `${tapRoot}/configs`,
  "@tasks": `${tapRoot}/tasks`
})

// Registers module-alias aliases
const registerAliases = () => moduleAlias.addAliases(aliases)

/**
 * Jest is not compatible with module-alias b/c it uses its own require function,
 * and it requires some slight changes to the format of each key and value.
 * This can be set to a jest config's `moduleNameMapper` property
 */
const jestAliases = deepFreeze(Object.keys(aliases).reduce(
  (aliasMap, key) => {
    const formattedKey = key + '/(.*)'
    aliasMap[formattedKey] = aliases[key] + '/$1'
    return aliasMap
  },
  {}
))

module.exports = {
  aliases,
  registerAliases,
  jestAliases
}
