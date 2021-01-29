const fs = require('fs')
const { template } = require('@keg-hub/jsutils')

template.regex = /\${(.*?)\}/g

/**
 * ref: https://v1-docs.qawolf.com/docs/configure_qa_wolf#arguments
 * 
 * @param {object} props - combination of QA wolf createTemplate props and templatePath
 * @param {string} props.templateFile - path to template file, relative to app root
 * @param {string} props.device - playwright device to emulate
 * @param {string} props.name - name of the test
 * @param {string} props.url - visit this URL to begin the test
 * @param {string} props.body - body of test
 * @param {string} props.timeout - test timeout
 * @param {string} props.feature - path to feature file
 * 
 * @returns {string} - test template
 */
module.exports.createTemplate = (props) => {
  const templateString = fs.readFileSync(
    props.templateFile, 
    { encoding: 'utf8' }
  )

  return template(templateString, props)
}