const { isFunc, validate } = require('@keg-hub/jsutils')

const clientHooks = {
  BeforeAll: () => {},
  AfterAll: () => {}
}

const AfterAll = afterAllFn => {
  validate({ afterAllFn }, { afterAllFn: isFunc }, { throws: true })
  clientHooks.AfterAll = afterAllFn
}

const BeforeAll = beforeAllFn => {
  validate({ beforeAllFn }, { beforeAllFn: isFunc }, { throws: true })
  clientHooks.BeforeAll = beforeAllFn
}

module.exports = {
  BeforeAll,
  AfterAll,
  clientHooks
}