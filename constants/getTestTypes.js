const path = require('path')

let __TEST_TYPES

/**
 * Builds the test types allowed when working with keg-herkin
 * @param {string} testsRoot - Location to the tests directory
 * @param {Object} pathEnvs - Locations test directories within the testsRoot
 *
 * @returns {Object} - Built allowed test types object
 */
const getTestTypes = (testsRoot, pathEnvs) => {
  if(__TEST_TYPES) return __TEST_TYPES

  const {
    HERKIN_ARTIFACTS_DIR,
    HERKIN_FEATURES_DIR,
    HERKIN_REPORTS_DIR,
    HERKIN_SUPPORT_DIR,
    HERKIN_STEPS_DIR,
    HERKIN_UNIT_DIR,
    HERKIN_WAYPOINT_DIR,
  } = pathEnvs

  __TEST_TYPES = {
    artifact: {
      type: 'artifact',
      ext: '*',
      location: path.join(testsRoot, HERKIN_ARTIFACTS_DIR),
    },
    feature: {
      type: 'feature',
      ext: 'feature',
      location: path.join(testsRoot, HERKIN_FEATURES_DIR),
    },
    report: {
      type: 'report',
      ext: 'html',
      location: path.join(testsRoot, HERKIN_REPORTS_DIR),
    },
    support: {
      type: 'support',
      ext: 'js',
      location: path.join(testsRoot, HERKIN_SUPPORT_DIR),
    },
    definition: {
      type: 'definition',
      ext: 'js',
      location: path.join(testsRoot, HERKIN_STEPS_DIR),
    },
    unit: {
      type: 'unit',
      ext: 'js',
      location: path.join(testsRoot, HERKIN_UNIT_DIR),
    },
    waypoint: {
      type: 'waypoint',
      ext: 'js',
      location: path.join(testsRoot, HERKIN_WAYPOINT_DIR),
    }
  }

  return __TEST_TYPES
}


module.exports = {
  getTestTypes
}