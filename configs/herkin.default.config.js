const path = require('path')

const rootDir = path.join(__dirname, '../')

const {
  HERKIN_FEATURES_DIR,
  HERKIN_STEPS_DIR,
  HERKIN_SUPPORT_DIR,
  HERKIN_UNIT_DIR,
  HERKIN_WAYPOINT_DIR,
} = process.env

module.exports = {
  paths: {
    rootDir,
    testsRoot: path.join(rootDir, 'tests'),
    stepsDir: HERKIN_STEPS_DIR || 'bdd/steps',
    featuresDir: HERKIN_FEATURES_DIR || 'bdd/features',
    supportDir: HERKIN_SUPPORT_DIR || 'bdd/support',
    unitDir: HERKIN_UNIT_DIR || 'jest',
    waypointDir: HERKIN_WAYPOINT_DIR || 'waypoint'
  },
  server: {
    port: '5005',
    host: '0.0.0.0'
  }
}
