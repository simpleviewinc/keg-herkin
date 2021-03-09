const { parkin } = require('./instance')

global.getParkinInstance = () => parkin
global.getParkinOptions = () => ({})
