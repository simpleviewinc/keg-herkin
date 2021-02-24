#!/usr/bin/env node

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const apiEndpoints = require('./endpoints')
const { sockr } = require('./libs/sockr/src/server')
const { getHerkinConfig } = require('HerkinConfigs/getHerkinConfig')
const { noOpObj, eitherArr, isArr, isObj, exists, isStr } = require('@keg-hub/jsutils')

const rootPath = path.join(path.normalize(__dirname), '..')

/**
 * Configures cors for the backend API and websocket
 * Defines the origins that are allow to connect to the API
 * @param {Object} app - Express app object
 * @param {Object} config - Herkin config server property object ( herkinConfig.server )
 *
 * @returns {void}
 */
const setupCors = (app, config=noOpObj) => {
  if(!app) return

  const allowedOrigins = !config.origins
    ? ['*']
    : eitherArr(config.origins, [config.origins])

  app.use((req, res, next) => {
    const origin = req.headers.origin
    const foundOrigin = (allowedOrigins.includes(origin)) ? origin : allowedOrigins[0]

    res.header("Access-Control-Allow-Origin", foundOrigin)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

    next()
  })

}

const addStaticPath = (app, name, loc) => {
  loc
    ? app.use(name, express.static(path.join(rootPath, loc)))
    : app.use(express.static(path.join(rootPath, name)))
}

/**
 * Configures the API and sets static paths based on the config object
 * @param {Object} app - Express app object
 * @param {Object} config - Herkin config server property object ( herkinConfig.server )
 *
 * @returns {void}
 */
const setupServer = (app, config) => {

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  
  // Setup the static paths of the server for serving files
  isStr(config.static)
    ? app.use(express.static(config.static))
    : isArr(config.static)
      ? config.static.map(loc => addStaticPath(app, loc))
      : isObj(config.static)
        ? Object.entries(config.static).map(([name, loc]) => addStaticPath(app, name, loc))
        : app.use(express.static(rootPath))

  ;(!exists(config.nodeModules) || config.nodeModules !== false) &&
    app.use('/node_modules', express.static(rootPath + '/node_modules'))
}

/**
 * Starts a express API server, and connects the sockr Websocket
 * Loads the HerkinConfig, which is used for configuring the server
 *
 * @returns {Object} - Express app, server and socket.io socket
 */
const initApi = async () => {
  const config = getHerkinConfig()
  const serverConfig = config.server
  const app = express()

  setupServer(app, serverConfig)
  setupCors(app, serverConfig)
  apiEndpoints(app, config)
  
  const server = app.listen(
    serverConfig.port,
    serverConfig.host,
    () => console.log(new Date() + ` - Listening on ${serverConfig.host}:${serverConfig.port}`)
  )

  const socket = await sockr(server, config.server)

  return { app, server, socket }
}

module.exports = {
  initApi
}
