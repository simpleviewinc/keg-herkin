import { noOpObj } from '@keg-hub/jsutils'
import { reduceObj } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import React, { useMemo, useCallback, useState } from 'react'
import { ChevronDown, Copy } from 'SVAssets/icons'
import { SimpleList, Row, Text, View, Touchable } from 'SVComponents'
import { addStepFromDefinition } from 'SVActions/features/local/addStepFromDefinition'
import { DefinitionListItem } from './definitionListItem'

/**
 * Sorts the passed in array of items alphabetically based on each items title property
 * @private
 * @param {Array<Object>} items - Group of objects with a title property
 *
 * @return {Object} - Items sorted alphabetically
 */
const alphaSort = items => {
  items.sort(function(a, b) {
    const textA = a.title.toLowerCase()
    const textB = b.title.toLowerCase()
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
  })

  return items
}

/**
 * Sorts each definition group type alphabetically
 * Also sorts the all group by definition type
 * @private
 * @param {Object} grouped - Groups of step definitions separated by type
 *
 * @return {Object} - Sorted Groups of definitions alphabetically and by type 
 */
const sortDefinitions = grouped => {

  grouped.all.items.sort((a, b) => {
    const textA = a.title.toLowerCase()
    const textB = b.title.toLowerCase()
    const aWhen = textA.startsWith('when')
    const bThen = textB.startsWith('then')
    const aThen = textA.startsWith('then')
    const bWhen = textB.startsWith('when')

    if(aWhen && bThen) return -1
    if(aThen && bWhen) return 1

    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
  })

  grouped.given.items = alphaSort(grouped.given.items)
  grouped.when.items = alphaSort(grouped.when.items)
  grouped.then.items = alphaSort(grouped.then.items)

  return grouped
}

/**
 * Sorts the passed in array of items alphabetically based on each items title property
 * @private
 * @param {Array<Object>} items - Group of objects with a title property
 *
 * @return {Object} - Items sorted alphabetically
 */
const alphaSort = items => {
  items.sort(function(a, b) {
    const textA = a.title.toLowerCase()
    const textB = b.title.toLowerCase()
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
  })

  return items
}

/**
 * Sorts each definition group type alphabetically
 * Also sorts the all group by definition type
 * @private
 * @param {Object} grouped - Groups of step definitions separated by type
 *
 * @return {Object} - Sorted Groups of definitions alphabetically and by type 
 */
const sortDefinitions = grouped => {

  grouped.all.items.sort((a, b) => {
    const textA = a.title.toLowerCase()
    const textB = b.title.toLowerCase()
    const aWhen = textA.startsWith('when')
    const bThen = textB.startsWith('then')
    const aThen = textA.startsWith('then')
    const bWhen = textB.startsWith('when')

    if(aWhen && bThen) return -1
    if(aThen && bWhen) return 1

    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
  })

  grouped.given.items = alphaSort(grouped.given.items)
  grouped.when.items = alphaSort(grouped.when.items)
  grouped.then.items = alphaSort(grouped.then.items)

  return grouped
}

/**
 * Maps the definitions to a format that can be loaded by the SimpleList Component
 * Separates them by type, and creates a lookup map
 * @private
 * @param {Object} definitions - Groups of step definitions to search separated by type
 *
 * @return {Object} - Mapped definitions into SimpleList formatted object
 */
const useDefinitionGroups = definitions => {
  return useMemo(() => {
    return reduceObj(definitions, (key, defs, grouped) => {

      defs.map(def => {
        const itemProps = {
          title: `${def.type} ${def.name}`,
          uuid: def.uuid,
          meta: def.meta,
          actions: [{
            name: 'Copy to Clipboard',
            key: `action-copy`,
            iconProps: {
              size: 14,
              Component: Copy,
            },
          }]
        }
        grouped[key].items.push(itemProps)
        grouped.all.items.push(itemProps)
        grouped.lookup[def.uuid] = def
      })

      return sortDefinitions(grouped)
    }, {
      lookup: {},
      all: { type: 'all', group: 'All Steps', toggled: true, items: [] },
      given: { type: 'given', group: 'Given Steps', toggled: false, items: [] },
      when: { type: 'when', group: 'When Steps', toggled: false, items: [] },
      then: { type: 'then', group: 'Then Steps', toggled: false, items: [] },
    })
  }, [ definitions ])
}

const renderItem = props => (<DefinitionListItem {...props} />)

/**
 * DefinitionList - Renders a list of Step Definitions
 * @param {Object} props
 * @param {Object} props.definitions - Items to show in the list
 * @param {Object} props.feature - Parent active feature file
 * @param {Object|function} props.contextRef - React ref of the current text editor being used
 * @param {Object} props.styles - Custom styles for displaying the component
 *
 * @returns {Component}
 */
export const DefinitionList = props => {

  const { definitions, feature, contextRef, styles=noOpObj } = props
  const { lookup, ...groupedDefs } = useDefinitionGroups(definitions)
  const [listItems, setListItems] = useState(groupedDefs)

  const onItemPress = useCallback((event, item) => {
    // TODO: feature and context are not currently used
    // Right now it just copies the text to the clipboard
    // Lookup the definition from the lookup table using the uuid
    // Then add it to the active feature by calling the addStepFromDefinition action
    const definition = lookup[item.uuid]
    definition
      ? addStepFromDefinition({
          feature,
          definition,
          clipboard: true,
          context: contextRef.current,
        })
      : console.warn(`Could not find matching definition for item:`, item)
  }, [lookup, feature, contextRef.current])

  const onHeaderPress = useCallback((event, meta) => {
    const listItemsCopy = { ...listItems }
    const activeGroup = reduceObj(listItems, (key, group, updated) => {
      const active = updated || (group.toggled && group)
      // Update all other groups toggled to false in the same iteration
      // Allows only looping over the groups once
      listItemsCopy[key].toggled = (group.type === meta.type) && !meta.toggled

      return active
    }, false)

    // Update the list items with a new version
    // Which includes the updated active group
    setListItems(listItemsCopy)
  }, [listItems, setListItems])

  const listStyles = useStyle(`definitions.list`, styles)

  return (
    <View
      className={`definition-list-main`}
      style={listStyles.main}
    >
      <SimpleList
        styles={listStyles.list}
        items={listItems}
        toggled={false}
        headerToggle={false}
        renderItem={renderItem}
        onHeaderPress={onHeaderPress}
        onItemPress={onItemPress}
        HeaderIcon={ChevronDown}
      />
    </View>
  )
}