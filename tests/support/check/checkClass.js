
/**
 * Check if the given element has the given class
 * @param  {String}   selector              Element selector
 * @param  {String}   falseCase         Whether to check for the class to exist
 *                                      or not ('has', 'does not have')
 * @param  {String}   expectedClassName The class name to check
 */
const checkClass = (selector, falseCase, expectedClassName) => {
  const classesList = $(selector).getAttribute('className').split(' ');

  falseCase === 'does not have'
    ? expect(classesList).not.toContain(
        expectedClassName, "Element "
          .concat(selector, " should not have the class ")
          .concat(expectedClassName)
      )
    : expect(classesList).toContain(
        expectedClassName, "Element "
          .concat(selector, " should have the class ")
          .concat(expectedClassName)
      )
}

module.exports =  {
  checkClass
}