const { HERKIN_ROOT, TEST_UTILS_PATH } = require('../constants/backend')
const moduleAlias = require('module-alias')
const { deepFreeze } = require('@keg-hub/jsutils')
const path = require('path')

// aliases shared by jest and module-alias
const aliases = deepFreeze({
  HerkinRoot: HERKIN_ROOT,
  HerkinTemp: path.join(HERKIN_ROOT, 'temp'),
  HerkinRepos: path.join(HERKIN_ROOT, 'repos'),
  HerkinConfigs: path.join(HERKIN_ROOT, 'configs'),
  HerkinTasks: path.join(HERKIN_ROOT, 'tasks'),
  HerkinModels: path.join(HERKIN_ROOT, 'repos/shared/models'),
  HerkinApp: path.join(HERKIN_ROOT, 'repos/backend/app/app.js'),
  HerkinPaths: path.join(HERKIN_ROOT, 'repos/backend/utils/paths.js'),
  HerkinBackConstants: path.join(HERKIN_ROOT, 'constants', 'backend'),
  HerkinScreenCast: path.join(HERKIN_ROOT, 'repos/screenCast/index.js'),
  HerkinEndpoints: path.join(HERKIN_ROOT, 'repos/backend/endpoints'),
  HerkinMiddleware: path.join(HERKIN_ROOT, 'repos/backend/middleware'),
  HerkinAppRouter: path.join(HERKIN_ROOT, 'repos/backend/appRouter.js'),
  HerkinFrontConstants: path.join(HERKIN_ROOT, 'constants', 'frontend'),
  HerkinParkin: path.join(TEST_UTILS_PATH, 'parkin'),
  HerkinSetup: path.join(TEST_UTILS_PATH, 'playwright', 'setupTestEnvironment'),
  HerkinPlaywright: path.join(TEST_UTILS_PATH, 'playwright'),
  HerkinSteps: path.join(TEST_UTILS_PATH, 'steps'),
  HerkinSupport: path.join(TEST_UTILS_PATH, 'support'),
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
