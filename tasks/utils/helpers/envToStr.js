
const envToStr = envs => Object.keys(envs).map(key => `--env ${key}=${envs[key]}`)

module.exports = {
  envToStr
}