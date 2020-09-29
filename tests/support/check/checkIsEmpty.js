const { checkContainsAnyText } = require("./checkContainsAnyText")

const checkIsEmpty = (elementType, element, falseCase) => {
  let newFalseCase = true
  if (typeof falseCase === 'function' || falseCase === ' not') newFalseCase = false

  checkContainsAnyText(elementType, element, newFalseCase)
}

module.exports = {
  checkIsEmpty
}