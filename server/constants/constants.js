const { keyMap }  = require('@keg-hub/jsutils')

module.exports = {
  NOT_REPLACE: '( not)*',
  REGEX_VARIANT: 'regex',
  ...keyMap([
    'NOT_PARAMETER',
    `NOT_INDEX`,
    'PARAMETER',
  ], true)
}
