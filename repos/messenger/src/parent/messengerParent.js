import { toggle } from './toggle'
import { connectToChild } from 'penpal'
import { parentConfig } from './parent.config'
import { createDomTree } from './domTree/createDomTree.js'
import { deepMerge, checkCall, noOpObj } from '@keg-hub/jsutils'
import { Page } from './page'
/**
 * MessengerParent
 * Parent Class for interacting with a Messenger child instance within an Iframe
 * @class
 * @param {Object} config - Options for setting up the Messenger Parent Instance
 *
 * @return {Object} Instance of the Messenger Parent
 */
export class MessengerParent {

  isOpen=false
  iframeLoaded=false
  isConnected=false
  __instanceType='parent'

  constructor(config=noOpObj){
    this.__init(config)
  }

  /**
  * Initialization method for setting up the Messenger Parent
  * @memberof MessengerParent
  * @function
  * @param {Object} config - Custom config options to override the defaults
  *
  * @return {void}
  */
  __init(config){
    this.config = deepMerge(parentConfig, config)
    this.isOpen = this.config.startOpen
    
    this.container = createDomTree(this.config, {
      onToggle: this.__toggle,
      // _ represents an internal method
      __iframeOnLoad: this.__iframeOnLoad,
    })

    // Call toggle to set the iframe to the correct position
    // this.isOpen is updated after toggle
    // So pass the opposite of it's value to set the correction position
    toggle(!this.isOpen, this.container, this.config)
  }

  /**
  * Internal method for handling when the child iframe loads
  * <br/> IMPORTANT - Must be called, or the Messenger will display on the page
  * <br/> Sets the container opacity to 1, on Iframe load
  * <br/> Ensures the Messenger content loaded smoothly
  * @memberof MessengerParent
  * @function
  * @param {Object} event - Native Dom event object
  *
  * @return {void}
  */
  __iframeOnLoad = event => {
    this.iframeLoaded = true

    // Call the custom onLoad method if it exists
    const customOnLoad = this.config.iframe.onLoad || this.config.iframe.attrs.load
    checkCall(customOnLoad, event, this)

    // Update the container opacity, so the Loaded Iframe can be seen
    this.container.style.opacity = 1

    this.connect()
  }

  /**
  * Helper method to toggle the Messenger container open and closed
  * <br/> Sets the container opacity to 1, on Iframe load
  * <br/> Ensures the Messenger content loaded smoothly
  * @memberof MessengerParent
  * @function
  * @param {Object} event - Native Dom event object
  *
  * @return {void}
  */
  __toggle = event => {
    if(!this.iframeLoaded) return

    // Call the custom onToggle method if it exists
    checkCall(this.config.toggle.onToggle, event, this)

    this.isOpen = toggle(this.isOpen, this.container, this.config)
  }

  /**
  * Connects the Messenger between Parent and Child
  * @memberof MessengerParent
  * @function
  * @param {Object} iframeEl - Custom IFrame element to connect to (Override the default)
  * @param {Object} options - Custom options passed on to penpal.connectToChild method
  *                           [List of options](https://github.com/Aaronius/penpal#readme)
  *
  * @return {Object} - Exposed child methods
  */
  connect = async (options=noOpObj, iframeEl) => {
    if(this.isConnected) return this.child
  
    iframeEl = iframeEl || this.container.getElementsByTagName('iframe')[0]

    if(!iframeEl)
      return console.error(`MessengerParent.connect requires a child IFrame Element.`)

    // Ensure we have initialized the exposed methods
    this.methods = new Page({
      ...this.config,
      methods: {
        ...this.methods,
        ...this.config.methods,
        ...options.methods,
        // Add toggle method to allow the child to toggle its self
        toggle: this.__toggle.bind(this),
      }
    })

    const connection = connectToChild({
      ...options,
      ...this.config.connection,
      iframe: iframeEl,
      methods: this.methods,
    })

    // Store the connection, and the child methods
    // The connection has the destroy method, so we hang on to it
    this.child = {
      connection,
      methods: await connection.promise,
    }

    // Call the onConnection callback after the the connection is established
    checkCall(this?.config?.connection?.onConnection, this)

    // Update the connected state
    this.isConnected = true

    return this.child
  }

  /**
  * Clean up method, removes all the things created by the Messenger Parent
  * @memberof MessengerParent
  * @function
  *
  * @return {boolean} - True if the destroy method finishes running 
  */
  destroy = () => {

    // Destroy the connection with the child iframe
    this.child?.connection?.destroy?.()
    this.child = undefined

    if(!this || !this.container) return
    
    // Remove the event on the iframe
    const iframeEl = this.container.getElementsByTagName('iframe')[0]
    iframeEl && iframeEl.removeEventListener('load', this.__iframeOnLoad)

    // Remove the event on the actionEl
    const actionEl = this.container.getElementsByTagName('span')[0]
    actionEl && actionEl.removeEventListener('click', this.__toggle)

    // Remove the container from the dom
    this.container?.parentNode?.removeChild(this.container)
    this.container && (this.container = undefined)

    // Reset the class to the default state
    this.isOpen = false
    this.isConnected = false
    this.iframeLoaded = false
    this.config = undefined

    // Call the onDisconnect callback after the the connection is destroyed
    checkCall(this?.config?.connection?.onDisconnect, this)

    return true
  }

}
