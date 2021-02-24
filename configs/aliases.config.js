const { HERKIN_ROOT, TEST_UTILS_PATH } = require('../constants/backend')
const moduleAlias = require('module-alias')
const { deepFreeze } = require('@keg-hub/jsutils')
const path = require('path')

// aliases shared by jest and module-alias
const aliases = deepFreeze({
  "HerkinRoot": HERKIN_ROOT,
  "HerkinRepos": path.join(HERKIN_ROOT, 'repos'),
  "HerkinConfigs": path.join(HERKIN_ROOT, 'configs'),
  "HerkinTasks": path.join(HERKIN_ROOT, 'tasks'),
  "HerkinBackConstants": path.join(HERKIN_ROOT, 'constants', 'backend'),
  "HerkinFrontConstants": path.join(HERKIN_ROOT, 'constants', 'frontend'),
  "HerkinParkin": path.join(TEST_UTILS_PATH, 'parkin'),
  "HerkinSetup": path.join(TEST_UTILS_PATH, 'playwright', 'setupTestEnvironment'),
  "HerkinPlaywright": path.join(TEST_UTILS_PATH, 'playwright'),
  "HerkinSteps": path.join(TEST_UTILS_PATH, 'steps'),
})

// Registers module-alias aliases (done programatically so we can reuse the aliases object for jest)
const registerAliases = () => moduleAlias.addAliases(aliases)

/**
 * Jest is not compatible with module-alias b/c it uses its own require function,
 * and it requires some slight changes to the format of each key and value.
 * `jestAliases` can be set as value of any jest config's `moduleNameMapper` property
 */
const jestAliases = deepFreeze(Object.keys(aliases).reduce(
  (aliasMap, key) => {
    const formattedKey = key + '(.*)'
    aliasMap[formattedKey] = aliases[key] + '$1'
    return aliasMap
  },
  {}
))

module.exports = {
  aliases,
  registerAliases,
  jestAliases
}
