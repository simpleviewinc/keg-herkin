const fs = require('fs')

const {
  TEMPLATE_TYPE='jest'
} = process.env

/**
 * @param {Object} params - params of the test, as provided by qa-wolf
 */
module.exports.createTemplate = (params) => {
  const {
    device,
    name,
    statePath,
    url,
    useTypeScript
  } = params

  const template = fs.readFileSync(
    `tests/bdd/support/qawolf-${TEMPLATE_TYPE}.template.js`, 
    { encoding: 'utf8' }
  )

  return template.replace(/\$name|\$url|\$device/gi, matched => ({
    $name: name,
    $url: url,
    $device: device
  })[matched])
}