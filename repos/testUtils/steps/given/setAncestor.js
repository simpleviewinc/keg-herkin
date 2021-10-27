const { Given } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')
 
/**
* Finds the element matching selector returned from selectorAlias, and registers it as the current ancestor
* @param {string} ancestorSelector - valid playwright selector that is the ancestor element
* @param {string} alias - mapped selector alias if there is one otherwise the word `selector`
* @param {string} data - if mapped alias exists then this is the on-screen text of the selector.  if no mapped alias exists then this is the selector + on-screen text of the element
* @param {Object} world
*/

//example of how selectors can be mapped to aliases
//this step definition is a core step therefore the mapping wouldn't be included here
//mapping could be added to mounted world.js that would, in future, be accessible via the UI
const selectorAlias = {
   session : (data) => {
       return `.ef-grid-item-content:has(div:text('${data}'))`
   },
   filter_modal : (data) => {
       return `.evf-modal:has(h5:text('${data}'))`
   },
   //if an element isn't mapped pass selector as the {word} (no quotes) and actual selector as {string}
   selector : (data) => {
       return data
   },
}

const findElSetAsAncestor = async (alias, data, world) => {
  let ancestorSelector 
  try {
    ancestorSelector = selectorAlias[alias](data)
  }
  catch(err){
    throw new Error([
      `The selector alias ${alias} does not exist as a property of the selectorAlias object.`,
      `Please ensure ${alias} is spelled correctly in the feature step,`,
      `and that ${alias} is a property of the selectorAlias object.`
    ].join(`\n`))
  }
  const ancestor = getElement(ancestorSelector)

  world.meta = {
      ancestor,
      ancestorSelector,
  }

  return ancestor
}

Given('the {word} titled/identifier {string} is found', findElSetAsAncestor, {
// the given line below errors due to the optional word next to the expression.  the error says that selectorAlias isn't a function.  A ticket has been created for this (ZEN-618).  The descriptions and example below are how the step will be used once ZEN-618 is resolved.
//Given('the {word} (titled ){string} is found', findElSetAsAncestor, {
    description: `Locates an element by selector AND text.
Establishes the element as an ancestor for use by subsequent steps that reference a descendent element.
The word "titled" is optional depending on context.  See examples below for usage.
    
Module : findElAsAncestor`,
    expressions: [
      {
        type: 'word',
        description: `The alias for the selector OR the word selector if no alias exists.

Examples:
  Alias Example (listing) : Given the listing titled "The Simpleville Hotel" is found.
  Selector Example : Given the selector ".item[data-type=\'listings\']:has(a:text(\'The Simpleville Hotel\'))" is found
  
  `,
      },
      {
        type: 'string',
        description: `If {word} is an alias then {string} is the element text.  If {word} is selector then {string} is the element selector including text if so desired.
        
Examples:
  Alias Example (listing) : Given the listing titled "The Simpleville Hotel" is found
  Selector Example : Given the selector ".item[data-type=\'listings\']:has(a:text(\'The Simpleville Hotel\'))" is found`,
      }
    ]
})

module.exports = { findElSetAsAncestor }
