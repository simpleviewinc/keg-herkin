const fs = require('fs')
const { template } = require('@keg-hub/jsutils')
// TODO: remove after jsutils update
template.regex = /\${(.*?)\}/g

/**
 * ref: https://v1-docs.qawolf.com/docs/configure_qa_wolf#arguments
 * 
 * @param {object} props - combination of QA wolf createTemplate props and templatePath
 * @param {string} props.templateFile - path to template file, relative to app root
 * @param {string} props.device - playwright device to emulate
 * @param {string} props.name - name of the test
 * @param {string} props.url - visit this URL to begin the test
 * 
 * @returns {string} - test template
 */
module.exports.createTemplate = (props) => {
  const {
    device,
    name,
    url,
    templateFile
  } = props

  const templateString = fs.readFileSync(
    templateFile, 
    { encoding: 'utf8' }
  )

  return template(templateString, { name, url, device })
}