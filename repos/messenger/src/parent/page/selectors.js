export const $ = (selector, context=document) => context.querySelector(selector)

export const $$ = (selector, context=document) => Array.from(context.querySelectorAll(selector))

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