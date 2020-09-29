
/**
 * Select an option of a select element
 * @param  {String}   selectionType  Type of method to select by (name, value or
 *                                   text)
 * @param  {String}   selectionValue Value to select by
 * @param  {String}   selector     Element selector
 */
const selectOption = (selectionType, selectionValue, selector) => {
  let _$
  let command = ''
  let commandArguments = [selectionValue]

  switch (selectionType) {
    case 'name': {
      command = 'selectByAttribute'
      commandArguments.unshift('name')
      break
    }
    case 'value': {
      commandArguments.unshift('value')
      command = 'selectByAttribute'
      break
    }
    case 'text': {
      command = 'selectByVisibleText'
      break
    }
    default: {
      throw new Error("Unknown selection type \"".concat(selectionType, "\""))
    }
  }

  (_$ = $(selector))[command].apply(_$, commandArguments)
}

module.exports = {
  selectOption
}