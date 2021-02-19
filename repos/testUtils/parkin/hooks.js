const { parkin } = require('./instance')

const getHook = (parkin, hookName) =>
  parkin.hooks[hookName].bind(parkin.hooks)

/**
 * Cucumber-like hooks
 * @example
 * import { BeforeAll, AfterAll } from 'HerkinParkin'
 * BeforeAll(() => setupMyTestEnv())
 * AfterAll(() => cleanupMyEnv())
 */
module.exports = {
  BeforeAll: getHook(parkin, 'beforeAll'),
  AfterAll:  getHook(parkin, 'afterAll'),
  Before: getHook(parkin, 'beforeEach'),
  After: getHook(parkin, 'afterEach'),
}