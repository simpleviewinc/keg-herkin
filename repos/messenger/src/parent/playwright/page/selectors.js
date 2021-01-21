import { ElementHandle } from '../elementHandle/elementHandle'

export const $ = (selector, context = document) => {
  if (!selector)
    throw new Error(`Page#$ ( select ) requires a selector argument`)

  const element = context.querySelector(selector)
  return new ElementHandle(element)
}

export const $$ = (selector, context = document) => {
  if (!selector)
    throw new Error(`Page#$$ ( group select ) requires a selector argument`)

  const elements = Array.from(context.querySelectorAll(selector))
  return elements.map((element) => new ElementHandle(element), [])
}

export const frame = selector => {
  return window.frames[selector]
}

export const frames = () => {
  return Array.from(window.frames)
}

export const $eval = (selector, pageFunction, arg) => {
  console.log(`---------- Not Implemented ----------`)
}

export const $$eval = (selector, pageFunction, arg) => {
  console.log(`---------- Not Implemented ----------`)
}

export const getAttribute = (selector, name, options) => {
  console.log(`---------- Not Implemented ----------`)
}
