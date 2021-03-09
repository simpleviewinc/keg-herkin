import { EventTypes } from '@ltipton/sockr'

/**
 * Dispatches that a command is running
 * Makes call to toggleIsRunning, to turn it off
 * @param {Object} data - Message data from the socket
 *
 * @returns {void}
 */
export const cmdRunning = data => {
  console.log(`---------- cmd running ----------`)
  console.log(data)
}
