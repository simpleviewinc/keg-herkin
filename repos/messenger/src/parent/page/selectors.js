
export const $ = (selector, context=document) => {
  if(!selector)
    throw new Error(`Page#$ ( select ) requires a selector argument`)

  const element = context.querySelector(selector)

  return {
    html: element.outerHTML,
    css: getComputedStyle(element).cssText
  }
}

export const $$ = (selector, context=document) => {
  if(!selector)
    throw new Error(`Page#$$ ( group select ) requires a selector argument`)

  const elements = Array.from(context.querySelectorAll(selector))

  return elements.map(element => ({
    html: element.outerHTML,
    css: getComputedStyle(element).cssText
  }))
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