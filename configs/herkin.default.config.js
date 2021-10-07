const path = require('path')
const { serverConfig } = require('./server.config.js')
const { sockrCmds } = require('./sockrCmds.config.js')
const {
  HERKIN_ROOT,
  HERKIN_REPORTS_DIR,
  HERKIN_TESTS_ROOT,
  HERKIN_FEATURES_DIR,
  HERKIN_STEPS_DIR,
  HERKIN_SUPPORT_DIR,
  HERKIN_UNIT_DIR,
  HERKIN_WAYPOINT_DIR,
  TEST_TYPES,
} = require('../constants/backend')

module.exports = {
  sockr: {
    ...sockrCmds,
    ...serverConfig,
  },
  screencast: {
    // Proxy settings, for connecting the backend API to the noVNC server
    proxy: {
      host: serverConfig.host || '0.0.0.0',
      port: process.env.NO_VNC_PORT || 26369,
      path: '/novnc',
    },
    // Default playwright browser launch settings
    browser: {},
    // Default tigervnc server settings
    vnc: {},
    // Default websockify server settings
    sockify: {},
  },
  server: serverConfig,
  paths: {
    rootDir: HERKIN_ROOT,
    reportsDir: HERKIN_REPORTS_DIR,
    testsRoot: HERKIN_TESTS_ROOT,
    featuresDir: HERKIN_FEATURES_DIR,
    stepsDir: HERKIN_STEPS_DIR,
    supportDir: HERKIN_SUPPORT_DIR,
    unitDir: HERKIN_UNIT_DIR,
    waypointDir: HERKIN_WAYPOINT_DIR
  },
  testTypes: TEST_TYPES,
}
