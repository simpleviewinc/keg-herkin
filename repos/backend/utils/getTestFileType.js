
// TODO: update to pull the tests folder form the herkin config
const getTestFileType = location => {
  return location.includes('/tests/bdd')
    ? 'bdd'
    : location.includes('/tests/jest')
      ? 'unit'
      : location.includes('/tests/waypoint')
        ? 'waypoint'
        : 'unknown'
}

module.exports = {
  getTestFileType
}