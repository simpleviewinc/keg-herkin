
export const $ = (selector, context=document) => {
  if(!selector)
    throw new Error(`Page#$ ( select ) requires a selector argument`)

  return context.querySelector(selector)
}

export const $$ = (selector, context=document) => {
  if(!selector)
    throw new Error(`Page#$$ ( group select ) requires a selector argument`)

  return Array.from(context.querySelectorAll(selector))
}

export const $eval = (selector, pageFunction, arg) => {
  console.log(`---------- Not Implemented ----------`)
}

export const $$eval = (selector, pageFunction, arg) => {
  console.log(`---------- Not Implemented ----------`)
}

export const frame = (frameSelector) => {
  console.log(`---------- Not Implemented ----------`)
}

export const frames = () => {
  console.log(`---------- Not Implemented ----------`)
}

export const getAttribute = (selector, name, options) => {
  console.log(`---------- Not Implemented ----------`)
}