import { noOpObj } from '@keg-hub/jsutils'

export const addScriptTag = (script=noOpObj) => {
  const { url, path, content, type='text/javascript' } = script
  path && console.warn(`Path ${path} is not supported in this context`)

  const scriptEl = document.createElement('script')
  scriptEl.type = type
  url && (scriptEl.src = url)
  content && (script.innerHTML = content)

  document.getElementsByTagName('head')[0].appendChild(scriptEl)
}

export const addStyleTag = (style=noOpObj) => {
  const { url, path, content } = style
  path && console.warn(`Path ${path} is not supported in this context`)

  const styleEl = document.createElement(url ? 'link' : 'style')

  !url
    ? (() => {
        styleEl.setAttribute('type', 'text/css')
        content && (script.innerHTML = content)
      })
    : (() => {
        styleEl.src = url
        styleEl.setAttribute('rel', 'stylesheet')
      })

  document.getElementsByTagName('head')[0].appendChild(styleEl)
}

export const content = () => {
  return document.documentElement.outerHTML
}

export const evaluate = (pageFunction, arg) => {
  console.log(`---------- Not Implemented ----------`)
}

export const evaluateHandle = (pageFunction, arg) => {
  console.log(`---------- Not Implemented ----------`)
}

export const exposeBinding = (name, playwrightBinding, options) => {
  console.log(`---------- Not Implemented ----------`)
}

export const exposeFunction = (name, playwrightFunction) => {
  console.log(`---------- Not Implemented ----------`)
}
