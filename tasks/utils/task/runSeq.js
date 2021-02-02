/**
 * TODO: update keg-herkin to use `jsutils.runSeq` once it's released
 * 
 * Calls each promise-returning function in array `asyncFns`,
 * but awaits each before calling the next. Will pass the
 * index and resolved values of complete functions to each subsequent
 * function, in case any need them.
 * @param {Array<Function>} asyncFns 
 */
module.exports.runSeq = async (asyncFns=[]) => {
  const results = []
  for (const fn of asyncFns) {
    const result = await fn(results.length, results)
    results.push(result)
  }
  return results
}