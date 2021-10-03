#!/usr/bin/env node
const { getApp } = require('HerkinApp')
const apiEndpoints = require('HerkinEndpoints')
const { Logger } = require('@keg-hub/cli-utils')
const { screenCast } = require('HerkinScreenCast')
const { sockr } = require('@ltipton/sockr/src/server')
const {
  setupCors,
  setupLogger,
  setupServer,
  setupStatic,
  setupVNCProxy,
} = require('HerkinMiddleware')

/**
 * Starts a express API server, and connects the sockr Websocket
 * Loads the HerkinConfig, which is used for configuring the server
 *
 * @returns {Object} - Express app, server and socket.io socket
 */
const initApi = async () => {
  const app = getApp()
  const {
    server:serverConf,
    sockr:sockrConf,
    screenCast:screenCastConf
  } = app.locals.config


  Logger.info(`Starting ScreenCast...`)
  await screenCast(screenCastConf)
  Logger.success(`ScreenCast started`)

  setupLogger(app)
  setupCors(app)
  setupVNCProxy(app)
  setupServer(app)
  setupStatic(app)
  apiEndpoints(app)

  const server = app.listen(
    serverConf.port,
    serverConf.host,
    () => {
      const serverUrl = `http://${serverConf.host}:${serverConf.port}`

      Logger.empty()
      Logger.pair(`Herkin API server listening on`, serverUrl)
      Logger.empty()
    }
  )


  const socket = await sockr(server, sockrConf, 'tests')

  return { app, server, socket }
}

module.exports = {
  initApi
}
