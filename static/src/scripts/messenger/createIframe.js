import { deepMerge, isFunc, isArr, isStr } from '@keg-hub/jsutils'

const isDocReady = () => {
  return document.readyState === 'complete' || document.readyState === 'interactive'
}

const addContainerToDom = (iframe) => {
  isDocReady()
    ? document.body.appendChild(iframe)
    : document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(iframe)
      })
}


const getToggleStyles = ({ speed, side, type }) => {
  return {
    [side]: 0,
    transition: `${side} ${speed}ms ${type}`,
    ...(
      side === 'left' || side === 'right'
        ? { position: 'fixed', top: 0 }
        : { position: 'fixed' }
    )
  }
}

const addIframeStyles = (iframe, config) => {
  Object.assign(iframe.style, deepMerge(
    config.iframe.attrs.style,
    config.iframe.style,
    {
      width: '100%',
      height: '100%',
      border: 'none',
    }
  ))
}

const addIframeAttrs = (iframe, config) => {
  const ifConfig = config.iframe
  Object.entries(ifConfig.attrs).map(([ attr, value ]) => {
    iframe.setAttribute(attr, value)
  })

  ifConfig.id && iframe.setAttribute('id', ifConfig.id)
  ifConfig.src && iframe.setAttribute('src', ifConfig.src)
  ifConfig.class && iframe.setAttribute('className', ifConfig.class)
}

const getIframe = (id) => {
  const iframe = document.getElementById(id)
  return iframe || document.createElement('iframe')
}

const buildElement = (type, attrs, children) => {
  try {
    const element = document.createElement(type)

    Object.entries(attrs)
      .map(([ attr, value ]) => {
        isFunc(value)
          ? element.addEventListener(attr, value)
          : attr === 'style'
            ? Object.assign(element.style, value)
            : element.setAttribute(attr, value)
      })

    isArr(children)
      ? children.map(child => {
        const childEl = buildElement(...child)
        isStr(childEl)
          ? (element.innerHTML = childEl)
          : element.appendChild(childEl)
      })
      : children && (element.innerHTML = children)

    return element
  }
  catch(err){
    if(attrs || children) throw err
    return isArr(type) && type[0] || type
  }

}

const buildContainer = (iframe, config, toggleCallback) => {
  const container = buildElement(
    'div',
    { 
      id: `keg-messenger`,
      className: `keg-messenger`,
      style: deepMerge(getToggleStyles(config.toggle), {
        width: '50vw',
        height: '100vh',
        maxWidth: '50%',
      })
    },
    [[
      'div',
      {
        id: `keg-toggle`,
        className: `keg-toggle`,
        style: {
          position: 'absolute',
          left: '-65px',
          top: '0px',
        }
      },
      [[
        'button',
        {
          id: `keg-toggle-action`,
          className: `keg-toggle-action`,
          click: toggleCallback
        },
        'Toggle'
      ]]
    ]]
  )
  container.appendChild(iframe)

  return container
}

export const createIframe = (config, toggleCallback) => {
  const ifConfig = config.iframe
  const iframe = getIframe(ifConfig.id || ifConfig.attrs.id)
  const container = buildContainer(iframe, config, toggleCallback)

  addIframeAttrs(iframe, config)
  addIframeStyles(iframe, config)
  addContainerToDom(container)

  return container
}
