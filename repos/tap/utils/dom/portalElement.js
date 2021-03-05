
export let __PORTAL_NODE

(() => {
  __PORTAL_NODE = document.createElement('div')
  __PORTAL_NODE.className = 'keg-root-portal'
  __PORTAL_NODE.style.position = 'sticky'
  __PORTAL_NODE.style.bottom = 0

  const body = document.querySelector('body')
  body.style.flexDirection = 'column'
  body.style.overflow = 'hidden'
})()
