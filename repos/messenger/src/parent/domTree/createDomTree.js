import { deepMerge, isArr } from '@keg-hub/jsutils'
import { convertTreeToDom } from './convertTreeToDom'

/**
 * Checks if the document is ready
 * @function
 * @private
 *
 * @return {boolean} - Ready state of the document
 */
const isDocReady = () => (
  document.readyState === 'complete' ||
    document.readyState === 'interactive'
)

/**
 * Adds the Messenger container Element to the Dom
 * @function
 * @private
 * @param {Object} container - Root Dom Element of the Messenger
 *
 * @return {void}
 */
const addContainerToDom = (container) => {
  isDocReady()
    ? document.body.appendChild(container)
    : document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(container)
      })
}

/**
 * Creates the styles of the Iframe Dom Element
 * @function
 * @private
 * @param {Object} config - Options for setting up the Messenger
 *
 * @return {Object} Styles for the Iframe Dom Element
 */
const getIframeStyles = config => {
  return deepMerge(
    config.iframe.attrs.style,
    config.iframe.style,
    {
      width: '100%',
      height: '100%',
      border: 'none',
    }
  )
}

/**
 * Creates the attributes to be added to the Iframe Dom Element
 * @function
 * @private
 * @param {Object} config - Options for setting up the Messenger
 * @param  {Object} events - Event handlers for interacting with the Messenger
 * @param  {function} events.__iframeOnLoad - Internal iframe onLoad event
 *
 * @return {Object} Attributes for the Iframe Dom Element
 */
const getIframeAttrs = (config, { __iframeOnLoad }) => {
  const ifConfig = config.iframe
  const { ...attrs } = ifConfig.attrs

  ifConfig.id && (attrs.id = ifConfig.id)
  ifConfig.src && (attrs.src = ifConfig.src)
  ifConfig.class && (
    attrs.className = isArr(ifConfig.class)
      ? ifConfig.class.join(' ')
      : ifConfig.class
  )
  attrs.style = getIframeStyles(config)

  // Set the internal iframe onload event
  attrs.load = __iframeOnLoad

  return attrs
}

/**
 * Creates the Iframe and Container Dom elements for the Messenger
 * @function
 * @param {Object} config - Options for setting up the Messenger
 * @param  {Object} events - Event handlers for interacting with the Messenger
 *
 * @return {Object} container - Root Dom Element of the Messenger
 */
export const createDomTree = (config, events) => {
  const ifConfig = config.iframe

  const iframe = document.getElementById(ifConfig.id || ifConfig.attrs.id)
  // If the iframe already exists, don't creat it, just return the container parent
  if(iframe) return iframe.parentNode

  // Build the domTree elements
  const container = convertTreeToDom(
    ['iframe', getIframeAttrs(config, events)],
    config,
    events,
  )

  // Add the elements to the DOM
  addContainerToDom(container)

  return container
}
