const path = require('path')
const { serverConfig } = require('./server.config.js')
const { sockrCmds } = require('./sockrCmds.config.js')
const {
  HERKIN_ROOT,
  HERKIN_TESTS_ROOT,
  HERKIN_FEATURES_DIR,
  HERKIN_STEPS_DIR,
  HERKIN_SUPPORT_DIR,
  HERKIN_UNIT_DIR,
  HERKIN_WAYPOINT_DIR,
} = require('../constants/backend')

module.exports = {
  sockr: {
    ...sockrCmds,
    ...serverConfig,
  },
  server: serverConfig,
  paths: {
    rootDir: HERKIN_ROOT,
    testsRoot: HERKIN_TESTS_ROOT,
    featuresDir: HERKIN_FEATURES_DIR,
    stepsDir: HERKIN_STEPS_DIR,
    supportDir: HERKIN_SUPPORT_DIR,
    unitDir: HERKIN_UNIT_DIR,
    waypointDir: HERKIN_WAYPOINT_DIR
  },
}
