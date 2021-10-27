const { deepFreeze } = require('@keg-hub/jsutils')

const {
  HERKIN_ARTIFACTS_DIR,
  HERKIN_REPORTS_DIR,
  HERKIN_FEATURES_DIR,
  HERKIN_STEPS_DIR,
  HERKIN_SUPPORT_DIR,
  HERKIN_UNIT_DIR,
  HERKIN_WAYPOINT_DIR,
} = process.env

/**
 * Constants that define overridable location to test directories
 */
const dirsFromEnvs = deepFreeze({
  HERKIN_REPORTS_DIR: HERKIN_REPORTS_DIR || 'reports',
  HERKIN_ARTIFACTS_DIR: HERKIN_ARTIFACTS_DIR || `artifacts`,
  HERKIN_FEATURES_DIR: HERKIN_FEATURES_DIR || 'bdd/features',
  HERKIN_STEPS_DIR: HERKIN_STEPS_DIR || 'bdd/steps',
  HERKIN_SUPPORT_DIR: HERKIN_SUPPORT_DIR || 'bdd/support',
  HERKIN_UNIT_DIR: HERKIN_UNIT_DIR || 'unit',
  HERKIN_WAYPOINT_DIR: HERKIN_WAYPOINT_DIR || 'waypoint',
})

module.exports = {
  dirsFromEnvs
}