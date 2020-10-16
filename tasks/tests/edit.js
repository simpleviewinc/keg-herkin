#!/usr/bin/env node

const { npx } = require('../helpers/process')
const { executeTask } = require('../helpers/executeTask')

const editTest = async (args) => {
  const { params } = args
  const { context } = params
  const resp = await npx(`qawolf edit ${context}`)

  return resp
}

const edit = {
  name: 'edit',
  action: editTest,
  example: 'yarn test:edit',
  description : 'Edit an existing test based on the passed in context',
  options: {
    context: {
      alias: [ 'name' ],
      description: 'Context or name of the test to be edit',
      required: true,
    },
  }
}

executeTask(module, edit, edit.name)
