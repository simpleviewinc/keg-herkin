const { When } = require('HerkinParkin')

When('I wait {float} seconds', num => {
  return new Promise(res => setTimeout(res, num * 1000))
})
