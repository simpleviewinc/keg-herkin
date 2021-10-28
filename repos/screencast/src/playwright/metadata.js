const os = require('os')
const fs = require('fs')
const path = require('path')
const { fileSys, Logger } = require('@keg-hub/cli-utils')
const { validate, isStr, isObj } = require('@keg-hub/jsutils')
const META_PATH = path.resolve(os.tmpdir(), 'browser-meta.json')

const { removeFile, readFile, writeFile } = fileSys


/**
 * @return {string?} contents of the browser-meta.json file if it can, else null
 */
const tryReadMeta = async () => {
  const [err, content] = await readFile(META_PATH, 'utf8')
  return err ? null : content
}

/**
 * Reads browser metadata from file
 * @param {string?} type - optional - specific browser type to read. If omitted, just returns all metadata.
 * @return {Object} - json of the metadata
 */
const read = async type => {
  try {
    const data = await tryReadMeta()
    const parsed = data ? JSON.parse(data) : {}
    const value = isObj(parsed) && type
      ? parsed[type]
      : parsed
    return value || {}
  }
  catch (err) {
    Logger.error(err)
    return {}
  }
}

/**
 * Saves browser metadata to file
 * @param {string} type - browser type (chromium, firefox, webkit, etc.)
 * @param {string} endpoint - websocket endpoint to the browser
 * @param {Object} launchOptions - other playwright launch options used (e.g. launchOptions.headless)
 */
const save = async (type, endpoint, launchOptions) => {
  const [ valid ] = validate({ type, endpoint }, { $default: isStr })
  if (!valid) return

  const content = await read()

  const nextMetadata = {
    ...content,
    [type]: {
      type,
      endpoint,
      launchTime: new Date().toString(),
      launchOptions
    }
  }

  const [err, _] = await writeFile(META_PATH, JSON.stringify(nextMetadata, null, 2))

  err && Logger.error(err)
}

/**
 * Removes the metadata to file
 *
 * @return {Void}
 */
const remove = async () => {
  return await removeFile(META_PATH)
}

module.exports = { read, remove, save }