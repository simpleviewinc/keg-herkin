const fs = require('fs')
const { limbo } = require('@keg-hub/jsutils')

/**
 * Wraps a method with a callback into a promise
 * @function
 * @param {*} cb - method to wrap in a promise
 * @param {*} args - Arguments to pass to the callback method
 *
 * @returns {Promise|*} - Success response of fs.rename method
 */
const limboify = (cb, ...args) => {
  return limbo(
    new Promise((res, rej) => cb(...args, (err, success) => 
      err? rej(err) : res(success || true) 
    ))
  )
}

/**
 * Copies from one file path to another
 * @function
 * @param {string} from - Path to copy from
 * @param {string} to - Path to copy to
 * @param {string} [mode=1] - Copy mode - Should overwrite the file
 *
 * @returns {Promise} - Resolves after file has been copied
 */
const copyFile = (to, from, mode) => {
  return limboify(fs.copyFile, to, from, mode)
}

/**
 * Makes a directory at the passed in folderPath
 * @function
 * @param {string} folderPath - Folder path to create
 *
 * @returns {Promise|boolean} - Success creating the directory
 */
const mkDir = filePath => {
  return limboify(fs.mkdir, filePath, { recursive: true })
}

const readDir = (dirPath) => {
  return limboify(fs.readdir, dirPath)
}

/**
 * Checks if a file path exists on the local HHD
 * @function
 * @param {string} checkPath - Path to check if exists
 *
 * @returns {Promise|boolean} - True if the path exists, false if not
 */
const pathExists = checkPath => {
  return limboify(fs.access, checkPath, fs.constants.F_OK)
}


/**
 * Reads a file from local HHD, and returns the contents
 * @function
 * @param {string} filePath - Path of the file to read
 * @param {string} [format=utf8] - Format of the file
 *
 * @returns {Promise|Array} - Slot 1 => error, Slot 2 => contents of file
 */
const readFile = (filePath, format='utf8') => {
  return limboify(fs.readFile, filePath, format)
}

/**
 * Removes a file from the local files system
 * @function
 * @param {string} file - Path to the file to be removed
 *
 * @returns {void}
 */
const removeFile = file => limboify(fs.unlink, file)

/**
 * Writes a file to the local HHD
 * @function
 * @param {string} filePath - Path to where the file should be written
 * @param {*} data - Contents to be written to the file
 * @param {string} [format=utf8] - Format of the file
 *
 * @returns {Promise|boolean} - True if the file was written successfully
 */
const writeFile = (filePath, data, format='utf8') => {
  return limboify(fs.writeFile, filePath, data, format)
}


module.exports = {
  copyFile,
  mkDir,
  readDir,
  pathExists,
  readFile,
  removeFile,
  writeFile,
}