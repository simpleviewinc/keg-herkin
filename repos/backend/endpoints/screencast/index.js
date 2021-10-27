const browser = require('./browser')
const vnc = require('./vnc')

module.exports = (...args) => {
  browser(...args)
  vnc(...args)
}