

export const createDomNode = (selectorId, type, location) => {
  let domNode = document[location].querySelector(`#${selectorId}`)
  if(domNode) return domNode

  domNode = document.createElement(type)
  domNode.id = selectorId
  document[location].append(domNode)

  return domNode
}