import React, { useMemo, useCallback } from 'react'
import { Values } from 'SVConstants'
import { useTheme } from '@keg-hub/re-theme'
import { View, SimpleList } from 'SVComponents'

import { reduceObj } from '@keg-hub/jsutils'
import { useSelector, shallowEqual } from 'react-redux'
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

export const DefinitionList = ({ definitions, styles }) => {
  const { lookup, ...groupedDefs } = useDefinitionGroups(definitions)

  const onItemPress = useCallback(() => {
    console.log(`---------- item press ----------`)
  }, [])

  return (
    <View>
      <SimpleList
        items={groupedDefs}
        toggled={false}
        onItemPress={ onItemPress }
        drawerProps={{}}
      />
    </View>
  )
}