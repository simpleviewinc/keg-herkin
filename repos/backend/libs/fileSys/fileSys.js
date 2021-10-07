const fs = require('fs')
const path = require('path')
const { fileSys } = require('@keg-hub/cli-utils')
const { limbo, isFunc, exists, noOpObj } = require('@keg-hub/jsutils')

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
      err? rej(err) : res(exists(success) ? success : true) 
    ))
  )
}

/**
 * Reads the contents of a directory
 *
 * @param {string} dirPath - Path to the directory to read
 *
 * @returns {Promise<Array>} - All files found in the directory
 */
const readDir = (dirPath) => {
  return limboify(fs.readdir, dirPath)
}

/**
 * Gets the meta data for a file or folder based on the passed in filePath
 * @function
 * @param {string} fromPath - Path to get the content from
 *
 * @returns {Promise|Object} - Meta data of the passed in path
 */
const getLastModified = async filePath => {
  const [__, metaData] = await limboify(fs.stat, filePath)
  // Return the mtimeMs (POSIX Epoch in milliseconds)
  // Either from the files stats, or current time
  return metaData ? metaData.mtimeMs : Date.now()
}

/**
 * Checks if the passed in path is a directory
 * @function
 * @param {string} fullPath - Path to check if it's a directory
 *
 * @returns {Promise|boolean} - True if fullPath a directory
 */
const isDirectory = async fullPath => {
  // Check if its a directory
  const [_, stat] = await limboify(fs.stat, fullPath)
  return stat.isDirectory()
}


module.exports = {
  ...fileSys,
  isDirectory,
  getLastModified,
  readDir,
}