const proxy = require('express-http-proxy')

/**
 * Setup the novnc proxy to forward all requests to that server
 */
const setupVNCProxy = app => {
  app.use('/novnc', proxy('http://0.0.0.0:26369'))
}

module.exports = {
  setupVNCProxy
}