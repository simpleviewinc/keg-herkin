const proxy = require('express-http-proxy')
const { get } = require('@keg-hub/jsutils')

/**
 * Setup the novnc proxy to forward all requests to that server
 */
const setupVNCProxy = app => {
  const { host, port, path } = get(app, 'locals.config.screencast.proxy', {
    port: 26369,
    host: `0.0.0.0`,
    path: '/novnc',
  })

  app.use(path, proxy(`http://${host}:${port}`))
}

module.exports = {
  setupVNCProxy
}