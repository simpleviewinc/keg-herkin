const path = require('path')
const { template } = require('@keg-hub/jsutils')
const { getFileContent } = require('../utils/getFileContent')

const templates = {
  reports404: path.join(__dirname, 'reports.404.html'),
  page404: path.join(__dirname, 'page.404.html'),
  feature: path.join(__dirname, 'feature.template.feature'),
  definition: path.join(__dirname, 'definition.template.js'), 
  unit: path.join(__dirname, 'unit.template.js'),
  waypoint: path.join(__dirname, 'waypoint.template.js'),
}

const loadTemplate = async (name, data) => {
  const content = await getFileContent(templates[name] || templates.page404)
  return template(content, data) 
}

module.exports = {
  loadTemplate
}