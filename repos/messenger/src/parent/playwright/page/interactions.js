import { dispatchEvent } from '../../../utils/dom/dispatchEvent'
import { withSelector } from '../../utils/dom/withSelector'

export const check = withSelector((element, selector, options) => {
  element.setAttribute(checked, true)
  return element
})

export const uncheck = withSelector((element, selector, options) => {
  element.setAttribute(checked, false)
  return element
})

export const click = withSelector((element, selector, options) => {
  dispatchEvent(element, 'click', 'MouseEvents', options)
  return element
})

export const dblclick = withSelector((element, selector, options) => {
  dispatchEvent(element, 'dblclick', 'MouseEvents', options)
  return element
})

export const fill = withSelector((element, selector, value, options) => {
  element.focus()
  element.value(value)
  return element
})

export const focus = withSelector((element, selector, options) => {
  element.focus()
  return element
})

export const hover = withSelector((element, selector, options) => {
  dispatchEvent(element, 'hover', 'MouseEvents', options)
})

export const press = withSelector((element, selector, key, options) => {
  element.focus()
  dispatchEvent(element, 'keydown', { key, ...options })
})

export const innerHTML = withSelector((element, selector, options) => {
  return element.innerHTML
})

export const innerText = withSelector((element, selector, options) => {
  return element.innerText
})

export const selectOption = withSelector(
  (element, selector, values, options) => {
    const { index, label, value } = options

    const hasMultiple = Boolean(element.getAttribute('multiple'))

    const optionEls = Array.from(element.getElementsByTagName('option'))
    optionEls.reduce((matching, optionEl, idx) => {
      if (matching.length && !hasMultiple) return matching

      if (
        idx === index ||
        value === optionEl.value ||
        label === optionEl.label
      ) {
        optionEl.setAttribute('selected')
        matching.push(optionEl.value)
      }

      return matching
    }, [])
  }
)

export const textContent = withSelector((element, selector, options) => {
  return element.textContent
})

// TODO: Must send events for keydown, keypress, keyup in that order
// For each char of the passed in text
export const type = withSelector((element, selector, text = '', options) => {
  // Implementation would look something like this =>
  //
  // element.focus()
  // text.split('').map(key => {
  //   dispatchEvent(element, 'keydown', { ...options, key })
  //   dispatchEvent(element, 'keypress', { ...options, key })
  //   dispatchEvent(element, 'keyup', { ...options, key })
  // })
  //

  console.log(`---------- Not Implemented ----------`)
})

const wrappedDispatchEvent = withSelector(
  (element, selector, type, eventInit, options) => {
    dispatchEvent(element, type, eventInit, options)
    return element
  }
)

export { wrappedDispatchEvent as dispatchEvent }
