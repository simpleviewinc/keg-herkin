import React, { useMemo, useCallback, useState } from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { ChevronDown, Copy } from 'SVAssets/icons'
import { DefinitionListItem } from './definitionListItem'
import { noOpObj, reduceObj, deepClone } from '@keg-hub/jsutils'
import { useDefinitionGroups } from 'SVHooks/useDefinitionGroups'
import { SimpleList, Row, Text, View, Touchable } from 'SVComponents'
import { addStepFromDefinition } from 'SVActions/features/local/addStepFromDefinition'

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
        renderItem={DefinitionListItem}
        onHeaderPress={onHeaderPress}
        onItemPress={onItemPress}
        HeaderIcon={ChevronDown}
      />
    </View>
  )
}