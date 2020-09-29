const { initApi } = require('./server')

!module.parent
  ? initApi()
  : (module.exports = () => { initApi() })
