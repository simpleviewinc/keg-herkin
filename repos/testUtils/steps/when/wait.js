const { When } = require('HerkinParkin')

const wait = num => {
  return new Promise(res => setTimeout(res, num * 1000))
}

When('I wait {float} seconds', wait)

module.exports = { wait }
