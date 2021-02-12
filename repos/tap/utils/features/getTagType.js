
/**
 * Checks a tag's parent to determine it's type
 * @function
 * @public
 * @export
 * @param {Object} parent - Parsed parent object of a tag
 *
 * @return {string} - Tag type based on tag's parent
 */
export const getTagType = parent => {
  return !parent
    ? null
    : parent.feature
      ? 'feature'
      : parent.scenario
        ? 'scenario'
        : null
}