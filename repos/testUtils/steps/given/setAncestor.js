const { Given } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')
 
/**
* Finds the element matching selector returned from selectorAlias, and
* registers it as the current ancestor
* @param {string} ancestorSelector 
* @param {string} alias
* @param {string} data
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
    const ancestorSelector = selectorAlias[alias](data)
    const ancestor = getElement(ancestorSelector)

    world.meta = {
        ancestor,
        ancestorSelector,
    }

    return ancestor
}

//Given('the {word} titled/identifier {string} is found', findElSetAsAncestor, {
Given('the {word} (titled ){string} is found', findElSetAsAncestor, {
    description: 'Locates an element by selector AND text.\nEstablishes the element as an ancestor for use by subsequent steps that reference a descendent element.\nThe word "titled" is optional depending on context.  See examples below for usage.',
    expressions: [
      {
        type: 'word',
        description: 'The alias for the selector OR the word selector if no alias exists.',
        example: 'Using alias (listing) : Given the listing titled "The Simpleville Hotel" is found.\nNo alias : Given the selector ".item[data-type=\'listings\']:has(a:text(\'The Simpleville Hotel\'))" is found',
      },
      {
        type: 'string',
        description: 'If {word} is an alias then {string} is the element text.  If {word} is selector then {string} is the element selector including text if so desired.\n\nExamples:\nUsing alias (listing) : Given the listing titled "The Simpleville Hotel" is found\nNo alias : Given the selector ".item[data-type=\'listings\']:has(a:text(\'The Simpleville Hotel\'))" is found',
        example: 'Using alias (listing) : Given the listing titled "The Simpleville Hotel" is found.\nNo alias : Given the selector ".item[data-type=\'listings\']:has(a:text(\'The Simpleville Hotel\'))" is found',
      }
    ]
})

module.exports = { findElSetAsAncestor }
