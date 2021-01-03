import { $ } from './selectors'

export const check = (selector, options) => {
  console.log(`---------- Not Implemented ----------`)
}
export const click = (selector, options) => {
  const element = $(selector)
  element.click()
}
export const dblclick = (selector, options) => {
  console.log(`---------- Not Implemented ----------`)
}

export const dispatchEvent = (selector, type, eventInit, options) => {
  console.log(`---------- Not Implemented ----------`)
}

export const fill = (selector, value, options) => {
  const element = $(selector)
  element.value(value)
}

export const focus = (selector, options) => {
  const element = $(selector)
  element.focus()
}

export const hover = (selector, options) => {
  console.log(`---------- Not Implemented ----------`)
}

export const innerHTML = (selector, options) => {
  console.log(`---------- Not Implemented ----------`)
}

export const innerText = (selector, options) => {
  console.log(`---------- Not Implemented ----------`)
}

export const press = (selector, key, options) => {
  console.log(`---------- Not Implemented ----------`)
}

export const selectOption = (selector, values, options) => {
  console.log(`---------- Not Implemented ----------`)
}

export const textContent = (selector, options) => {
  console.log(`---------- Not Implemented ----------`)
}

export const type = (selector, text, options) => {
  console.log(`---------- Not Implemented ----------`)
}

export const uncheck = (selector, options) => {
  console.log(`---------- Not Implemented ----------`)
}
