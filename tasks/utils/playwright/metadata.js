const path = require('path')
const fs = require('fs')
const rootDir = require('app-root-path').path
const { validate, isStr } = require('@keg-hub/jsutils')

const META_PATH = path.resolve(rootDir, 'browser-meta.json')

/**
 * Reads browser metadata from file
 * @return {Object} - json of the metadata
 */
const read = () => {
  try {
    const data = fs.readFileSync(META_PATH, 'utf8')
    return JSON.parse(data)
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

  try {
    fs.writeFileSync(META_PATH, JSON.stringify({ type, endpoint, launchOptions }))
  }
  catch (err) {
    console.error(err)
  }
}

module.exports = { read, save }