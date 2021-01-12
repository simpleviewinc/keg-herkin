export const dispatchEvent = (element, type, eventInit, options) => {
  const event = document.createEvent(eventInit)
  options ? event.initEvent(type, options) : event.initEvent(type, true, true)

  element.dispatchEvent(event)

  return event
}
