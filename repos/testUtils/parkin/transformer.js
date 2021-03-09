
/**
 * Custom jest transformer for parsing feature files
 * Uses a consistent Parkin instance setup in the testUtils/parkin/setupTestEnvironment.js
 *
 * @return {Object} - Jest custom transformer model object
 */
module.exports = {
  process(src, filename, jestConfig) {
    return ([
      `const PK = global.getParkinInstance()`,
      `const parsedFeature = PK.parse.feature(${JSON.stringify(src)})`,
      `return PK.run(parsedFeature, global.getParkinOptions())`
    ]).join(`\n`)
  },
}