const { Logger }  = require('@keg-hub/ask-it/src/logger')

/**
 * Sets the envs for using VNC inside docker, or the host machine websocket
 * for displaying the browser
 *
 * @param {boolean} useVNC - True if VNC should be used instead of the host websocket
 *
 * @returns {boolean} - True if VNC should be used instead of the host websocket
 */
const checkShouldUseVNC = (useVNC) => {
  process.env.HERKIN_USE_VNC = Boolean(useVNC)
  // Using the browser websocket should be the inverse of using VNC
  process.env.HERKIN_PW_SOCKET = !useVNC

  useVNC && Logger.info(`Using docker VNC to render browser tests`)

  return useVNC
}

module.exports = {
  checkShouldUseVNC
}