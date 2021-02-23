const { Given } = require('HerkinParkin')
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()
const { wordsToNumbers } = require('words-to-numbers')

const validTypes = [
  'ancestor',
  'parent'
]

Given('the {word} {string} element exists as {word}', async (numberWord, selector, type, world) => {
  if (!validTypes.includes(type))
    throw new Error(`Element relationship must be one of ${JSON.stringify(validTypes, null, 2)}`)

  const index = wordsToNumbers(numberWord) - 1
  const page = await getPage()

  const elements = await page.$$(selector)
  if (!elements.length) throw new Error(`No element found with selector ${selector}`)

  const element = await elements[index]
  if (!element) throw new Error(`Element ${selector} does not exist at specified index: ${index}`)

  world.ancestor = {
    element,
    selector,
    index,
    type,
    combinator: type === 'parent' ? '>' : '>>'
  }
})
