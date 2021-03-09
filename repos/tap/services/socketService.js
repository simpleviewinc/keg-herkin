import * as sockrActions from 'SVActions/sockr'
import { isFunc, camelCase, snakeCase, checkCall } from '@keg-hub/jsutils'
import { serverConfig } from '../../../configs/server.config'
import { WSService as SockrService, EventTypes } from '@ltipton/sockr'

/**
 * Callback event functions bound to the SocketService
 * Each property function is called when a socket event happens through Sockr
 * @type Object
 * @private
 *
 * @property {function} all - Called for all socket events
 * @property {function} connect - Called when the socket connects
 * @property {function} init - Called when the socket it initialized (after connect)
 * @property {function} cmdRunning - Called when a command is running on the backend
 */
const events = {
  all: function(message, instance, event){
    if(!event) return

    // Get the name of the action from sockr's Event Types
    // And convert into an action name for the taps sockr actions
    const actionName = camelCase((event.split(':')[1] || '').toLowerCase())
    checkCall(sockrActions[actionName], message)
  },
}

/**
 * Service class for managing client websocket events
 * @function
 * @private
 *
 * @param {Object} config - Websocket client config object matching the config spec
 * @param {function} dispatch - Method to be called to update the websocket state
 * @param {string} token - Auth token for connecting to the websocket
 *
 * @returns {Object} - Instance of SocketService
 */
class SocketService {
  constructor(config){
    this.events = Object.entries(events)
      .reduce((bound, [name, func]) => {
        bound[name] = func.bind(this)
        return bound
      }, {})

    Object.assign(this, config)
  }

  /**
   * Sends an event to the connected backend through websocket ( Like an REST API call )
   * @memberof SocketService
   * @type function
   * @public
   * @param {string} event - Name of the event to emit ( Sent to the backend )
   * @param {Object} data - Content sent to the backend
   *
   * @returns {void}
   */
  emit = (event, data) => {
    // Get a matching event type from sockr
    // Or use the passed in event if one does not exist
    const eventType = EventTypes[snakeCase(event)] || event

    // Emit the event to the backend
    SockrService.emit(eventType, data)
  }


  /**
   * Calls the SockrService runCommand method 
   * Helper to make running command esier
   * @memberof SocketService
   * @type function
   * @public
   * @param {Object} data - Content sent to the backend
   *
   * @returns {*} Response from SockrService.runCommand
   */
  runCommand = (data, params) => SockrService.runCommand(data, params)

  /**
   * Disconnects from the backend websocket
   * Cleans up any open object || handles
   * @memberof SocketService
   * @type function
   * @public
   *
   * @returns {void}
   */
  disconnect = () => SockrService.disconnect()

}

export const WSService = new SocketService(serverConfig)