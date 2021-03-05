const path = require('path')
const fs = require('fs')
const { HERKIN_ROOT } = require('HerkinBackConstants')
const { validate, isStr, isObj } = require('@keg-hub/jsutils')

const META_PATH = path.resolve(HERKIN_ROOT, 'browser-meta.json')

/**
 * @return {string?} contents of the browser-meta.json file if it can, else null
 */
const tryReadMeta = () => {
  try {
    return fs.readFileSync(META_PATH, 'utf8')
  }
  catch (err) {
    return null
  }
}

/**
 * Reads browser metadata from file
 * @param {string?} type - optional - specific browser type to read. If omitted, just returns all metadata.
 * @return {Object} - json of the metadata
 */
const read = type => {
  try {
    const data = tryReadMeta()
    const parsed = data ? JSON.parse(data) : {}
    const value = isObj(parsed) && type
      ? parsed[type]
      : parsed
    return value || {}
  }
  catch (err) {
    console.error(err)
    return {}
  }
}

/**
 * Saves browser metadata to file
 * @param {string} type - browser type (chromium, firefox, webkit, etc.)
 * @param {string} endpoint - websocket endpoint to the browser
 * @param {Object} launchOptions - other playwright launch options used (e.g. launchOptions.headless)
 */
const save = (type, endpoint, launchOptions) => {
  const [ valid ] = validate({ type, endpoint }, { $default: isStr })
  if (!valid) return

  const nextMetadata = {
    ...read(),
    [type]: {
      type,
      endpoint,
      launchTime: new Date().toString(),
      launchOptions
    }
  }

  try {
    fs.writeFileSync(META_PATH, JSON.stringify(nextMetadata, null, 2))
  }
  catch (err) {
    console.error(err)
  }
}

module.exports = { read, save }