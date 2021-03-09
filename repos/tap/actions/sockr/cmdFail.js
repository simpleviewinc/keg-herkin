import { EventTypes } from '@ltipton/sockr'

/**
 * Dispatches an error that occurred on while a command was running
 * Makes call to toggleIsRunning, to turn it off
 * @param {Object} data - Message data from the socket
 *
 * @returns {void}
 */
export const cmdFail = (data, service) => {
  
}
