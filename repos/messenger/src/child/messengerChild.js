import { connectToParent } from 'penpal'
import { childConfig } from './child.config'
import { createMethods } from '../utils/createMethods'
import { deepMerge, noOpObj } from '@keg-hub/jsutils'
import { checkIframe } from './checkIframe'

export class MessengerChild{

  isConnected=false
  inIframe=false

  constructor(config=noOpObj){
    this.inIframe = checkIframe()
    this.__init(config)
  }

  /**
  * Ensures the MessengerChild is created within an Iframe element
  * @memberof MessengerChild
  * @function
  *
  * @return {void}
  */
  __checkIframe = () => {
    if(!this.inIframe)
      throw new Error(`Messenger Child must be created within an IFrame`)
  }

  /**
  * Initialization method for setting up the Messenger Parent
  * @memberof MessengerChild
  * @function
  * @param {Object} config - Custom config options to override the defaults
  *
  * @return {void}
  */
  __init(config){
    this.__checkIframe()
    
    this.config = deepMerge(childConfig, config)
  }

  /**
  * Connects the Messenger between Parent and Child
  * @memberof MessengerChild
  * @function
  * @param {Object} options - Custom options passed on to penpal.connectToChild method
  *                           [List of options](https://github.com/Aaronius/penpal#readme)
  *
  * @return {Object} - Exposed child methods
  */
  connect = async (options=noOpObj) => {
    this.__checkIframe()

    // Ensure we have initialized the exposed methods
    this.methods = this.methods || createMethods(this, {
      ...options.methods,
    })

    const connection = connectToParent({
      ...options,
      ...this.config.connection,
      // Methods child is exposing to parent
      methods: this.methods,
    })

    // Store the connection, and the parent methods
    // The connection has the destroy method, so we hang on to it
    this.parent = {
      connection,
      methods: await connection.promise
    }

    this.isConnected = true

    return this.parent
  }

  destroy = () => {
    this.__checkIframe()

    // Destroy the connection with the parent window
    this.parent?.connection?.destroy?.()
    this.parent = undefined

    // Reset the class to the default state
    this.config = false
    this.isConnected = false
  }

}