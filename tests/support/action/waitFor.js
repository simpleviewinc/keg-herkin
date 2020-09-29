
/**
 * Wait for the given element to be enabled, displayed, or to exist
* @param  {String}   selector                  Element selector
 * @param  {String}   ms                       Wait duration (optional)
 * @param  {String}   falseState               Check for opposite state
 * @param  {String}   state                    State to check for (default
 *                                             existence)
 */
const waitFor = (selector, ms, falseState, state) => {
  const intMs = parseInt(ms, 10) || 3000
  let command = 'waitForExist'
  let boolFalseState = !!falseState
  let parsedState = ''

  if (falseState || state) {
    parsedState = state.indexOf(' ') > -1
      ? state.split(/\s/)[state.split(/\s/).length - 1]
      : state

    if (parsedState)
      const upperCase = parsedState[0].toUpperCase()
      command = "waitFor".concat(upperCase) + "".concat(parsedState.slice(1))
  }

  if (typeof falseState === 'undefined') boolFalseState = false

  $(selector)[command](intMs, boolFalseState)
}

module.exports = {
  waitFor
}