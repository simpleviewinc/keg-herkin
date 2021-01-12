import { isFunc, isArr, isStr, isObj } from '@keg-hub/jsutils'

/**
 * Types of SVG dom elements, created with `createElementNS` method
 * @private
 * @Array
 */
const SVG_TYPES = [ `path`, `svg`, `circle` ]

/**
 * Extra prop for SVG dom elements, when calling the `createElementNS` method
 * @private
 * @string
 */
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

/**
 * Creates a dom element and children based on the passed arguments
 * @function
 * @param  {string} type - type of dom node that should be created
 * @param {Object} attrs - Attributes of the element
 * @param {Array|string} children - Child elements to create
 *
 * @return {Object} Built Dom Element
 */
export const buildElement = (type, attrs, children) => {
  try {
    // Create the dom element based on it's type
    // Extra edge case for SVG elements
    const element = SVG_TYPES.includes(type)
      ? document.createElementNS(SVG_NAMESPACE, type)
      : document.createElement(type)

    // Loop the attributes and add them based on their key
    // Handles functions by calling addEventListener
    // Handles style attribute as and object || string
    Object.entries(attrs).map(([ attr, value ]) => {
      isFunc(value)
        ? element.addEventListener(attr, value)
        : attr === 'style' && isObj(value)
          ? Object.assign(element.style, value)
          : element.setAttribute(attr, value)
    })

    // Add any children by recursively calling buildElement
    // Then appending each child to the current element
    isArr(children)
      ? isArr(children[0])
          ? children.map(child => {
              const childEl = isArr(child) ? buildElement(...child) : child

              isStr(childEl)
                ? element.appendChild(document.createTextNode(childEl))
                : element.appendChild(childEl)
            })
          : element.appendChild(buildElement(...children))
      : children && (element.innerHTML = children)

    return element
  }
  catch (err) {
    // If there was an error, with attrs and children, then throw it
    if (attrs || children) throw err

    // Otherwise, just return the type, because is should be a string which can be rendered
    return (isArr(type) && type[0]) || type
  }
}
