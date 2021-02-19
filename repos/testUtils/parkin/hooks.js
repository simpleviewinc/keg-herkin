const { parkin } = require('./instance')

const getHook = (parkin, hookName) =>
  parkin.hooks[hookName].bind(parkin.hooks)

// export the parkin hook register functions,
// but following the naming and casing used in cucumber
module.exports = {
  BeforeAll: getHook(parkin, 'beforeAll'),
  AfterAll:  getHook(parkin, 'afterAll'),
  Before: getHook(parkin, 'beforeEach'),
  After: getHook(parkin, 'afterEach'),
}