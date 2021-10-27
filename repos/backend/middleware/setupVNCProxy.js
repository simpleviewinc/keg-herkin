const { get } = require('@keg-hub/jsutils')
const { createProxyMiddleware } = require('http-proxy-middleware')

/**
 * Setup the novnc proxy to forward all requests to that server
 */
const setupVNCProxy = (app) => {
  const {
    port=26369,
    protocol='ws',
    path='/novnc',
    host=`0.0.0.0`,
    ...options
  } = get(app, 'locals.config.screencast.proxy', {})

  const wsProxy = createProxyMiddleware(path, {
    ws: true,
    changeOrigin: true,
    ...options,
    target: `${protocol}://${host}:${port}`
  })

  app.use(wsProxy)
  
  return wsProxy
}

module.exports = {
  setupVNCProxy
}