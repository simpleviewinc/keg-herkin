import { get, exists, isFunc, deepMerge } from '@keg-hub/jsutils'

const COPY_ATTRS = [
  'accessKey',
  'autocapitalize',
  'autofocus',
  'baseURI',
  'className',
  'clientHeight',
  'clientWidth',
  'clientLeft',
  'clientTop',
  'contentEditable',
  'dir',
  'disabled',
  'draggable',
  'elementTiming',
  'enterKeyHint',
  'form',
  'formAction',
  'formEnctype',
  'formMethod',
  'formNoValidate',
  'formTarget',
  'hidden',
  'id',
  'innerHTML',
  'innerText',
  'inputMode',
  'isConnected',
  'isContentEditable',
  'lang',
  'length',
  'localName',
  'name',
  'namespaceURI',
  'nodeName',
  'nodeType',
  'nodeValue',
  'nonce',
  'offsetHeight',
  'offsetLeft',
  'offsetTop',
  'offsetWidth',
  'outerHTML',
  'outerText',
  'scrollHeight',
  'scrollLeft',
  'scrollTop',
  'scrollWidth',
  'slot',
  'spellcheck',
  'tagIndex',
  'tagName',
  'textContent',
  'title',
  'translate',
  'type',
  'validationMessage',
  'value',
  'wholeText',
  'willValidate',
]

const NEEDS_EXTRA = [
  'nextElementSibling',
  'nextSibling',
  'offsetParent',
  'parentElement',
  'parentNode',
  'previousSibling',
  'style',
]

const valueFromArray = (emulated, key, value) => {
  const val = Array.from(value)
  val.length && (emulated[key] = val)

  return emulated
}

const KEY_HELPERS = {
  attributes: (emulated, key, value) => {
    emulated.attributes = []
    Array.from([...value])
        .map(attr => emulated.attributes.push({ name: attr.name, value: attr.value }))

    return emulated
  },
  dataset: (emulated, key, value) => {
    emulated.dataset = {}
    Object.entries({ ...value })
      .map(([ key, value ]) => (emulated.dataset[key] = value))

    return emulated
  },
  childNodes: (emulated, key, value) => {
    const childNodes = [...value].map(child => emulateDomNode(child))
    Object.assign(emulated, deepMerge({
        childNodes: childNodes,
        children: childNodes,
        childElementCount: childNodes.length,
      },
      (childNodes.length && {
        firstChild: childNodes[0],
        firstElementChild: childNodes[0],
        lastChild: childNodes[ childNodes.length -1 ],
        lastElementChild: childNodes[ childNodes.length -1 ],
      })
    ))

    return emulated
  },
  classList: valueFromArray,
  labels: valueFromArray,
}

const getAriaAttr = (emulated, key, value) => {
  key.indexOf('aria') === 0 &&
    exists(value) &&
    (emulated[key] = value)

  return emulated
}

const getNodeProperties = (node, emulated) => {
  for (const key in node){

    const value = get(node, key)
    if(!value) continue;
    
    COPY_ATTRS.includes(key)
      ? (emulated[key] = value)
      : isFunc(KEY_HELPERS[key])
        ? KEY_HELPERS[key](emulated, key, value)
        : getAriaAttr(emulated, key, value)
  }

  return emulated
}

export const emulateDomNode = node => {
  const emulated = {}

  return node
    ? getNodeProperties(node, emulated)
    : emulated
}