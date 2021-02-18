import { Values } from 'SVConstants'
import { noOpObj } from '@keg-hub/jsutils'
import { reduceObj } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import React, { useMemo, useCallback } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { ChevronDown, PlusCircle } from 'SVAssets/icons'
import { SimpleList, Row, Text, View, Touchable } from 'SVComponents'
import { addStepFromDefinition } from 'SVActions/features/addStepFromDefinition'
const { CATEGORIES, EDITOR_TABS } = Values

const useDefinitionGroups = definitions => {
  return useMemo(() => {
    return reduceObj(definitions, (key, defs, grouped) => {
      grouped[key] = grouped[key] || { group: `${key} Steps`, items: [] }

      defs.map(def => {
        const itemProps = {
          title: `${def.type} ${def.name}`,
          uuid: def.uuid,
          actions: [{
            name: 'add',
            key: `action-add`,
            showFeedback: false,
            iconProps: {
              size: 14,
              Component: PlusCircle,
            },
          }]
        }
        grouped[key].items.push(itemProps)
        grouped.all.items.push(itemProps)
        grouped.lookup[def.uuid] = def
      })

      return grouped
    }, { lookup: {}, all: { group: 'All Steps', toggled: true, items: [] } })
  }, [ definitions ])
}

export const DefinitionList = props => {

  const { definitions, feature, contextRef, styles=noOpObj } = props
  const { lookup, ...groupedDefs } = useDefinitionGroups(definitions)

  const onItemPress = useCallback((item, event) => {
    // Lookup the definition from the lookup table using the uuid
    // Then add it to the active feature by calling the addStepFromDefinition action
    const definition = lookup[item.uuid]
    definition
      ? addStepFromDefinition(definition, contextRef.current, feature)
      : console.warn(`Could not find matching definition for item:`, item)
  }, [lookup, feature, contextRef.current])

  const listStyles = useStyle(`definitions.list`, styles)

  return (
    <View
      className={`definition-list-main`}
      style={listStyles.main}
    >
      <SimpleList
        styles={listStyles.list}
        items={groupedDefs}
        toggled={false}
        onItemPress={ onItemPress }
        HeaderIcon={ChevronDown}
      />
    </View>
  )
}