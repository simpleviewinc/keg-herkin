const { When } = require('HerkinParkin')

const wait = num => {
  return new Promise(res => setTimeout(res, num * 1000))
}

When('I wait {float} seconds', wait)
When('I wait {float} second', wait)

module.exports = { wait }
