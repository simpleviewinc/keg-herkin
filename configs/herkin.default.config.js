const path = require('path')

const rootDir = path.join(__dirname, '../')

const {
  HERKIN_FEATURES_DIR,
  HERKIN_STEPS_DIR,
  HERKIN_WOLF_DIR,
  HERKIN_UNIT_DIR
} = process.env

module.exports = {
  paths: {
    rootDir,
    testsRoot: path.join(rootDir, 'tests'),
    stepsDir: HERKIN_STEPS_DIR || 'bdd/steps',
    featuresDir: HERKIN_FEATURES_DIR || 'bdd/features',
    unitDir: HERKIN_UNIT_DIR || 'jest',
    wolfDir: HERKIN_WOLF_DIR || 'wolf'
  },
  server: {
    port: '5005',
    host: '0.0.0.0'
  }
}
