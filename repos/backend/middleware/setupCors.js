const { eitherArr } = require('@keg-hub/jsutils')

/**
 * Configures cors for the backend API and websocket
 * Defines the origins that are allow to connect to the API
 * @param {Object} app - Express app object
 *
 * @returns {void}
 */
const setupCors = app => {
  if(!app) return

  const config = app.locals.config
  const allowedOrigins = !config.origins
    ? ['*']
    : eitherArr(config.origins, [config.origins])

  app.use((req, res, next) => {
    const origin = req.headers.origin
    const foundOrigin = (allowedOrigins.includes(origin)) ? origin : allowedOrigins[0]

    res.header('Access-Control-Allow-Origin', foundOrigin)
    res.header('Access-Control-Allow-Credentials','true');
    res.header('Access-Control-Allow-Headers','Content-Type');
    res.header('Access-Control-Allow-Methods','GET','POST','PUT','DELETE','OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,Authorization,AuthToken')

    return req.method === 'OPTIONS'
      ? res.status(200).send('OK')
      : next()
  })
}

module.exports = {
  setupCors
}