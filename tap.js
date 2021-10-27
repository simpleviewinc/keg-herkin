const { getHerkinConfig } = require('./configs/getHerkinConfig')
const config = getHerkinConfig()

module.exports = {
  name: 'keg-herkin',
  displayName: 'Keg-Herkin',
  keg: {
    envs: {
      'process.env.SERVER_HOST': config.server.host,
      'process.env.SERVER_PORT': config.server.port,
      'process.env.HERKIN_USE_VNC': process.env.HERKIN_USE_VNC,
      'process.env.NO_VNC_PORT': process.env.NO_VNC_PORT || 26369,
      'process.env.HERKIN_PW_SOCKET': process.env.HERKIN_PW_SOCKET,
    },
    cli: {
      link: {
        name: 'herkin'
      },
      publish: {
        herkin: {
          tasks: {
            install: true,
            test: true,
            build: true,
            publish: true,
            commit: true
          },
          tap: true,
          name: 'herkin',
          dependent: false,
          order: {
            '0': '@keg-hub/keg-herkin',
          }
        }
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
