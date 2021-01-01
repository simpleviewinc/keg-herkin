

const toggleOpen = (container, config) => {
  const iframe = container.getElementsByTagName('iframe')[0]
  iframe.style.display = 'initial'

  setTimeout(() => {
    container.style[config.toggle.side] = `0px`
  }, 10)
}

const toggleClosed = (container, config) => {
  const side = config.toggle.side
  const amount = side === 'top' || side === 'bottom'
      ? container.offsetHeight
      : container.offsetWidth

  container.style[side] = `${amount * -1}px`

  setTimeout(() => {
    const iframe = container.getElementsByTagName('iframe')[0]
    iframe.style.display = 'none'
  }, config.toggle.speed)
}

export const toggle = (isOpen, container, config) => {
  isOpen
    ? toggleClosed(container, config)
    : toggleOpen(container, config)

  return !isOpen
}