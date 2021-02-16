const { getHerkinConfig } = require('./configs/getHerkinConfig')
const config = getHerkinConfig()

module.exports = {
  name: 'keg-herkin',
  displayName: 'Keg-Herkin',
  keg: {
    envs: {
      'process.env.SERVER_HOST': config.server.host,
      'process.env.SERVER_PORT': config.server.port
    },
    cli: {
      link: {
        name: 'herkin'
      }
    },
    routes: {
      '/': 'RootContainer'
    },
    tapResolver: {
      paths: {
        tapSrc: './repos/tap'
      }
    },
    playwright: {
      browser: {
        type: 'chromium',
        allowed: [ 'chromium', 'firefox', 'webkit' ],
        headless: false
      }
    },
  },
  expo: {
    name: 'keg-herkin',
    slug: 'keg-herkin'
  }
}
