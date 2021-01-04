import { exists, isFunc, get, set, ensureArr } from '@keg-hub/jsutils'
import { emulateDomNode } from '../../utils/emulateDomNode'

export const $ = (selector, context=document) => {
  return selector && emulateDomNode(context.querySelector(selector))
}

export const $$ = (selector, context=document) => {
  return selector && Array.from(context.querySelectorAll(selector))
    .map(element => emulateDomNode(element))
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