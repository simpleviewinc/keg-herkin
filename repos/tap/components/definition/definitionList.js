import { Values } from 'SVConstants'
import { noOpObj } from '@keg-hub/jsutils'
import { reduceObj } from '@keg-hub/jsutils'
import { SimpleList, Text, View } from 'SVComponents'
import React, { useMemo, useCallback } from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { useSelector, shallowEqual } from 'react-redux'
import { ChevronDown } from 'SVAssets/icons'
const { CATEGORIES, EDITOR_TABS } = Values

const useDefinitionGroups = definitions => {
  return useMemo(() => {
    return reduceObj(definitions, (key, defs, grouped) => {
      grouped[key] = grouped[key] || { group: key, items: [] }

      defs.map(def => {
        const display = { title: `${def.type} ${def.name}`, uuid: def.uuid }
        grouped[key].items.push(display)
        grouped.all.items.push(display)
        grouped.lookup[def.uuid] = def
      })

      return grouped
    }, { lookup: {}, all: { group: 'all', items: [] } })
  }, [ definitions ])
}

const renderItem = props => {

  return (
    <View>
      <Text>Item</Text>
    </View>
  )

}

export const DefinitionList = ({ definitions, styles=noOpObj }) => {
  const { lookup, ...groupedDefs } = useDefinitionGroups(definitions)

  const onItemPress = useCallback(() => {
    // TODO: Add select step definition to the currently active feature
  }, [])

  const listStyles = useStyle(`definitions.list`, styles)
  const drawerProps = useMemo(() => {
    return {
      
    }
  }, [])

  return (
    <View
      className={`definition-list-main`}
      style={listStyles.main}
    >
      <SimpleList
        styles={listStyles.list}
        items={groupedDefs}
        renderItem={renderItem}
        toggled={false}
        onItemPress={ onItemPress }
        drawerProps={drawerProps}
        HeaderIcon={ChevronDown}
      />
    </View>
  )
}