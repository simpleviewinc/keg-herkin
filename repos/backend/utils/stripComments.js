const NEWLINES_MATCH = /\n|\r|\r\n/
const COMMENT_MATCH = /\/\/.*/g
const MULTI_LINE_MATCH = /\/\*(.*\n)*\*\//

/*
* Very simple comment stripper, that only gets rid of `//` and /* ... *\/
* Does not cover all used cases, and most likely will fail on edge cases
*/
const stripComments = str => {
  return str.trim()
    .split(NEWLINES_MATCH)
    .filter(line => !COMMENT_MATCH.test(line.trim()))
    .join(`\n`)
    .replace(MULTI_LINE_MATCH, '')
}

module.exports = {
  stripComments
}