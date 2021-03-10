
/**
 * Gets the file type based on location and allowed testTypes
 * @param {string} location - Location of the file to get the test type for
 * @param {Object} testTypes - Allowed test types
 *
 * @returns {string} - Found file type, one of the testTypes property keys
 */
const getTestFileType = (location, testTypes) => {
  const foundTestType = Object.entries(testTypes)
    .reduce((foundType, [type, typeMeta]) => {
      return !foundType && location.startsWith(typeMeta.location)
        ? typeMeta
        : foundType
    }, '')

  return foundTestType
    ? foundTestType.type
    : 'unknown'
}

module.exports = {
  getTestFileType
}