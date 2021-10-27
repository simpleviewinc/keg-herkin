const { getApp } = require('HerkinApp')
const { AppRouter } = require('HerkinAppRouter')
const { Logger } = require(`@keg-hub/cli-utils`)
const { get, isNum } = require(`@keg-hub/jsutils`)

/**
 * Log Levels by name and priority
 * @type {Object}
 */
const logLevelMap = Object.entries({
  none: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4
}).reduce((acc, [name, priority]) => {
  acc[name] = priority
  acc[priority] = name

  return acc
}, {})

/**
 * Helper to get information from a request
 * @function
 * @param {Object} req - Express request object for the incoming request
 *
 * @return {void}
 */
const getReqInfo = req => {
  return {
    request: `${req.method} ${req.originalUrl}`,
    host: req.hostname,
    body: req.body,
    query: req.query,
    params: req.params
  }
}

/**
 * Logs the massed in messages based on the app configs log level
 * If the apps logLevel is equal or less then the checkLevel, the message will be logged
 * @function
 * @param {number} checkLevel - Log level of the message
 * @param {Array<*>} messages - The items that should be logged
 *
 * @return {void}
 */
const logMessage = (checkLevel, ...messages) => {
  const app = getApp()
  const logType = get(app.locals, 'config.server.logLevel')
  const logLevel = isNum(logType) ? logType : logLevelMap[logType]

  logLevel &&
    logLevel <= checkLevel &&
    Logger.log(...messages)
}

/**
 * Handler for logging the incoming request
 * @function
 * @param {Object} req - Express request object for the incoming request
 * @param {Object} res - Express response object sent back to the client
 * @param {function} next - Express next method to pass control to the next handler of the request
 *
 * @return {void}
 */
const logRequest = (req, res, next) => {
  logMessage(2, Logger.colors.brightCyan(`[Keg-Herkin Req]`), getReqInfo(req))
  next()
}

// TODO: Add logger for response
const logResponse = (req, res, next) => {
  next()
}

/**
 * Adds middleware logging for requests and response
 * @function
 *
 * @return {void}
 */
const setupLogger = () => {
  AppRouter.use('*', logRequest)
}

module.exports = {
  setupLogger
}