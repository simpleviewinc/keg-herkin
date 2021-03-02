const fs = require('fs')
const path = require('path')
const { limbo, isFunc, exists } = require('@keg-hub/jsutils')

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


/**
 * Gets the content of a folder based on passed in options
 * @function
 * @param {string} fromPath - Path to get the content from
 * @param {Array} allFound  - Past found file paths
 * @param {string} file - File path to check if should be added to allFound array
 * @param {boolean} opts.full - Should return the full path
 * @param {string} opts.type - Type of content to return (folder || file)
 * @param {Array} opts.exclude - File or folder to exclude
 * @param {Array} opts.include - File or folder to include
 *
 * @returns {Promise|Array} - Array of found file paths
 */
const buildFoundArray = async ({ allFound, recurCall, file, fromPath, opts={} }) => {
  
  const { exclude=[], full, include=[], recursive, type } = opts
  const all = await allFound
  // Filter out any folder matching the exclude
  if(!file || exclude.indexOf(file) !== -1) return all

  // Get the full path of the file or folder
  const fullPath = path.join(fromPath, file)

  // Check if we should use the full path or relative
  const found = full ? fullPath : file

  // Check if its a directory
  const [_, stat] = await limboify(fs.stat, fullPath)
  const isDir = stat.isDirectory()
  // Check if found should be added to the array based on the passed in arguments
  // Check the for type match or no type
  ;( !type ||
    ( type === 'folder' && isDir ) ||
    ( type !== 'folder' && !isDir )) &&
    ( !include.length || include.indexOf(file) !== -1 ) &&
    all.push(found)

  return !isDir || !recursive || !isFunc(recurCall)
    ? all
    : recurCall(fullPath, opts, all)

}


/**
 * Gets the content of a folder based on passed in options synchronously
 * @function
 * @param {string} fromPath - Path to get the content from
 * @param {Object} [opts={}] - Options for filtering the found contnet
 * @param {boolean} opts.full - Should return the full path
 * @param {string} opts.type - Type of content to return (folder || file)
 * @param {Array} opts.exclude - File or folder to exclude
 * @param {Array} opts.include - File or folder to include
 *
 * @returns {Promise|Array} - Array of found items
 */
const getFolderContent = async (fromPath, opts={}, foundPaths=[]) => {
  const [ __, results ] = await limboify(fs.readdir, fromPath)
  return results.reduce((allFound, file) => buildFoundArray({
    opts,
    file,
    fromPath,
    allFound,
    recurCall: getFolderContent,
  }), foundPaths)
}

module.exports = {
  copyFile,
  mkDir,
  readDir,
  pathExists,
  readFile,
  removeFile,
  writeFile,
  getFolderContent
}