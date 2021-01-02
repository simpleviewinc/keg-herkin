const { keyMap }  = require('@keg-hub/jsutils')

module.exports = {
  NOT_REPLACE: '( not)*',
  REGEX_VARIANT: 'regex',
  EXPRESSION_VARIANT: 'expression',
  ...keyMap([
    'NOT_PARAMETER',
    `NOT_INDEX`,
    'PARAMETER',
  ], true)
}
