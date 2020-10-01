/**
 * Helper to log messages when not in production
 * @param {string} type - Type of log message. Must be one of log, info, dir, warn, error
 * @param {Array} toLog - Data to be logged
 */
export const devLog = (type, ...toLog) => {
  type = type === 'warn' ? 'info' : type

  process.env.NODE_ENV !== 'production' &&
    console[type] &&
    console[type](...toLog)
}

devLog.log = (...toLog) => devLog(`log`, ...toLog)
devLog.trace = (...toLog) => devLog(`trace`, ...toLog)
devLog.debug = (...toLog) => devLog(`debug`, ...toLog)
devLog.info = (...toLog) => devLog(`info`, ...toLog)
devLog.dir = (...toLog) => devLog(`dir`, ...toLog)
devLog.warn = (...toLog) => devLog(`warn`, ...toLog)
devLog.error = (...toLog) => devLog(`error`, ...toLog)
