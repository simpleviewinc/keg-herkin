const { npx } = require('../../utils/process/process')

const editTest = async (args) => {
  const { params } = args
  const { context } = params
  const resp = await npx(`qawolf edit ${context}`)

  return resp
}

module.exports = {
  edit: {
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
}
