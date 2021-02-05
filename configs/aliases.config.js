const moduleAlias = require('module-alias')
const tapRoot = require('app-root-path').path

const aliases = {
  "@root": tapRoot,
  "@repos": `${tapRoot}/repos`,
  "@configs": `${tapRoot}/configs`,
  "@tasks": `${tapRoot}/tasks`
}

/**
 * Register module aliases programmatically
 */
const registerAliases = () => moduleAlias.addAliases(aliases)

/**
 * Jest is not compatible with module-alias, and it requires some 
 * slight changes to the format of each key and value
 */
const jestAliases = Object.keys(aliases).reduce(
  (aliasMap, key) => {
    const formattedKey = key + '/(.*)'
    aliasMap[formattedKey] = aliases[key] + '/$1'
    return aliasMap
  },
  {}
)

module.exports = {
  aliases,
  registerAliases,
  jestAliases
}
