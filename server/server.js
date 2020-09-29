#!/usr/bin/env node

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const { getConfig } = require('./config')
const rootPath = path.join(path.normalize(__dirname), '..')
const apiEndpoints = require('./endpoints')

const initApi = () => {
  const config = getConfig()

  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(rootPath))
  app.use('/node_modules', express.static(rootPath + '/node_modules'))
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

  apiEndpoints(app, config)
  
  app.listen(config.server.port, config.server.host, () => {
    console.log(new Date() + ` - Listening on ${config.server.host}:${config.server.port}`)
  })

}

module.exports = {
  initApi
}
