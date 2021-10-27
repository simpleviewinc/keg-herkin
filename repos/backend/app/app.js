const express = require('express')
const { getHerkinConfig } = require('HerkinConfigs/getHerkinConfig')

let _APP

/**
 * Initializes an Express app if it does not already exist
 * @function
 * @public
 *
 * @returns {Object} - Express App Object
 */
const getApp = () => {
  if(!_APP) _APP = express()
  
  !_APP.locals.config && (_APP.locals.config = getHerkinConfig())

  return _APP
}

module.exports = {
  getApp
}