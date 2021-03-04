const { snakeCase, validate, isObj, get } = require('@keg-hub/jsutils')
const { replaceTemplateVars } = require('./replaceTemplateVars')

const getEnvName = env => `HERKIN_` + snakeCase(env).toUpperCase()

/**
 * Sets the env variables needed for 
 *  - mounting the test directories into the container.
 *  - client urls
 * @see `container/docker-compose.yml`, `volumes` group. It must be updated to work with these envs
 * @param {Object} config - herkin config object
 * @param {Object} options - options
 * @param {string} options.env - current keg environment
 */
const setMountEnvs = (config, options={}) => {
  const [ valid ] = validate({ config, options }, { $default: isObj })
  if (!valid) return

  // paths envs
  Object.entries(config.paths).map(([pathName, value]) => {
    const envName = getEnvName(pathName)
    process.env[envName] = replaceTemplateVars(value, config, options)
  })

  // app envs
  const appUrlEnv = getEnvName('appUrl')
  const appUrl = get(config, 'app.url')
  if (appUrl) {
    process.env[appUrlEnv] = replaceTemplateVars(appUrl, config, options)
  }
}

module.exports = {
  setMountEnvs,
}