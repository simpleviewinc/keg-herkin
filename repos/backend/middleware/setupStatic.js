const path = require('path')
const express = require('express')
const { getApp } = require('HerkinApp')
const { HerkinRoot } = require('HerkinPaths')
const { isArr, isObj, exists, isStr } = require('@keg-hub/jsutils')

/**
 * Configures middleware on the app to allow serving static paths based on the loc arg
 * All paths are relative to the apps root directory
 * @param {Object} app - Express app object
 * @param {string} [name=loc] - Path name to reference the static location
 * @param {string} loc - Location on the file system where static files are served
 *
 * @returns {void}
 */
const addStaticPath = (app, name, loc) => {
  loc
    ? app.use(name, express.static(path.join(HerkinRoot, loc)))
    : app.use(express.static(path.join(HerkinRoot, name)))
}

/**
 * Configures the API and sets static paths based on the config object
 * @param {Object} app - Express app object
 *
 * @returns {void}
 */
const setupStatic = app => {
  app = app || getApp()
  const config = app.locals.config

  // Setup the static paths of the server for serving files
  isStr(config.static)
    ? app.use(express.static(config.static))
    : isArr(config.static)
      ? config.static.map(loc => addStaticPath(app, loc))
      : isObj(config.static)
        ? Object.entries(config.static).map(([name, loc]) => addStaticPath(app, name, loc))
        : exists(config.static)
          ? app.use(express.static(HerkinRoot))
          : false

  // If nodeModules is true, then the node_modules folder is served as a static path
  ;(!exists(config.nodeModules) || config.nodeModules !== false) &&
    app.use('/node_modules', express.static(path.join(HerkinRoot + './node_modules')))

}

module.exports = {
  setupStatic
}