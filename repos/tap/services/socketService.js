import { isFunc, camelCase, snakeCase } from '@keg-hub/jsutils'
import { serverConfig } from '../../../configs/server.config'
import { WSService as SockrService, EventTypes } from 'SVUtils/sockr'

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
  init: function(message){},
  connect: function (message, instance){},
  all: function(message, instance, event){},
  cmdRunning: function(message, instance, event){},
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