
/**
 * Slide Toggles the Messenger open
 * @param  {Object} container - Root Dom Element of the Messenger
 * @param {Object} config - Options for setting up the Messenger
 *
 * @return {void}
 */
const toggleOpen = (container, config) => {
  const action = container.getElementsByTagName('span')[0]
  const iframe = container.getElementsByTagName('iframe')[0]
  iframe.style.display = 'initial'

  setTimeout(() => {
    container.style[config.toggle.side] = `0px`
    action.style.transform = `rotate(0deg)`
  }, 10)
}

/**
 * Slide Toggles the Messenger closed
 * @param  {Object} container - Root Dom Element of the Messenger
 * @param {Object} config - Options for setting up the Messenger
 *
 * @return {void}
 */
const toggleClosed = (container, config) => {
  const side = config.toggle.side
  const amount = side === 'top' || side === 'bottom'
      ? container.offsetHeight
      : container.offsetWidth

  container.style[side] = `${amount * -1}px`

  const action = container.getElementsByTagName('span')[0]
  action.style.transform = `rotate(180deg)`

  setTimeout(() => {
    const iframe = container.getElementsByTagName('iframe')[0]
    iframe.style.display = 'none'
  }, config.toggle.speed)
}

/**
 * Slide Toggles the Messenger open or closed based on the current state
 * @param  {boolean} isOpen - Current open state of the Messenger
 * @param  {Object} container - Root Dom Element of the Messenger
 * @param {Object} config - Options for setting up the Messenger
 *
 * @return {boolean} Updated open state of the Messenger
 */
export const toggle = (isOpen, container, config) => {
  isOpen
    ? toggleClosed(container, config)
    : toggleOpen(container, config)

  return !isOpen
}