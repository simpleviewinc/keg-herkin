import { exists, isFunc, get, set, ensureArr } from '@keg-hub/jsutils'

const addToGlobal = (selector, elements) => {
  elements = Array.isArray(elements) ? elements : [elements]
  
  const winTop = window.top
  winTop.__MESSENGER__ = winTop.__MESSENGER__ || {}

  const cachedEls = get(winTop, `__MESSENGER__.elements`, {})

  cachedEls[selector]
    ? cachedEls[selector].push(elements)
    : (cachedEls[selector] = elements)
  
  set(winTop, `__MESSENGER__.elements`, cachedEls)
}

const emulateDomNode = node => {

    const emulatedNode = {
      nodeName: node.nodeName,
      nodeType: node.nodeType,
      tagName: node.tagName,
      childNodes: [...node.childNodes].map(child => emulateDomNode(child)),
      textContent: node.textContent,
      attributes: []
    }

    node.attributes &&
      Array.from([...node.attributes])
        .map(attr => emulatedNode.attributes.push({ name: attr.name, value: attr.value }))

    return emulatedNode
}

export const $ = (selector, context=document) => {
  // return context.querySelector(selector)
  const element = context.querySelector(selector)
  addToGlobal(selector, element)
  return element
  // return element && emulateDomNode(element)
}

export const $$ = (selector, context=document) => {
  return Array.from(context.querySelectorAll(selector))
    .map(element => {
      // emulateDomNode(element)
      addToGlobal(element)
      return element
    })
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