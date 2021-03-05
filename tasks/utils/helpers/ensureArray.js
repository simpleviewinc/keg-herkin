const { isArr } = require('@keg-hub/jsutils')

const ensureArray = data => isArr(data) ? data : data.split(' ')

module.exports = {
  ensureArray
}