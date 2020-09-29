const { keyMap }  = require('@keg-hub/jsutils')

module.exports = {
  REGEXP_TESTER: new RegExp(/\(([^\)]+)\)/, g),
  ...keyMap([
    'NOT_PARAMETER',
    'PARAMETER',
  ], true)
}
