import { Values } from 'SVConstants'
import { noOpObj } from '@keg-hub/jsutils'
import { reduceObj } from '@keg-hub/jsutils'
import { SimpleList, Row, Text, View, Touchable } from 'SVComponents'
import React, { useMemo, useCallback } from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { useSelector, shallowEqual } from 'react-redux'
import { ChevronDown, PlusCircle } from 'SVAssets/icons'
const { CATEGORIES, EDITOR_TABS } = Values

const useDefinitionGroups = definitions => {
  return useMemo(() => {
    return reduceObj(definitions, (key, defs, grouped) => {
      grouped[key] = grouped[key] || { group: key, items: [] }

      defs.map(def => {
        const itemProps = {
          title: `${def.type} ${def.name}`,
          uuid: def.uuid,
          actions: [{
            // TODO: Fix icon styles for actions
            Icon: PlusCircle,
            key: `action-add`,
            name: 'add',
            action: () => {
              console.log(`---------- add me ----------`)
            }
          }]
        }
        grouped[key].items.push(itemProps)
        grouped.all.items.push(itemProps)
        grouped.lookup[def.uuid] = def
      })

      return grouped
    }, { lookup: {}, all: { group: 'all', items: [] } })
  }, [ definitions ])
}

export const DefinitionList = ({ definitions, styles=noOpObj }) => {
  const { lookup, ...groupedDefs } = useDefinitionGroups(definitions)

  const onItemPress = useCallback(() => {
    // TODO: Add select step definition to the currently active feature
  }, [])

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