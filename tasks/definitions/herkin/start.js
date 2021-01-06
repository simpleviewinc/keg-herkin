#!/usr/bin/env node

const { npx } = require('../utils/process/process')
const { executeTask } = require('../utils/task/executeTask')
const { sharedOptions } = require('../utils/options/sharedOptions')

const browserMap = {
  all: `--all-browsers`,
  chrome: `--chromium`,
  firefox: `--firefox`,
  safari: `--webkit`,
  webkit: `--webkit`,
}

const startHerkin = async (args) => {
  const { params } = args
  const cmd = buildTestArguments([], params)

  const resp = await npx([`qawolf`, `test`].concat(cmd))
  
  return resp
}

const start = {
  name: 'start',
  action: startHerkin,
  example: 'test:start',
  description : 'Starts all services. (Local Webserver and Docker Container)',
  options: {

  }
}

module.exports = executeTask(start)
