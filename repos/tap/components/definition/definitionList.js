import { noOpObj } from '@keg-hub/jsutils'
import { reduceObj } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import React, { useMemo, useCallback } from 'react'
import { ChevronDown, Copy } from 'SVAssets/icons'
import { SimpleList, Row, Text, View, Touchable } from 'SVComponents'
import { addStepFromDefinition } from 'SVActions/features/local/addStepFromDefinition'

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
      grouped[key] = grouped[key] || { group: `${key} Steps`, items: [] }

      defs.map(def => {
        const itemProps = {
          title: `${def.type} ${def.name}`,
          uuid: def.uuid,
          actions: [{
            name: 'Copy to Clipboard',
            key: `action-copy`,
            showFeedback: false,
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

      return grouped
    }, {
      lookup: {},
      all: { group: 'All Steps', toggled: true, items: [] },
      given: { group: 'Given Steps', toggled: false, items: [] },
      when: { group: 'When Steps', toggled: false, items: [] },
      then: { group: 'Then Steps', toggled: false, items: [] },
    })
  }, [ definitions ])
}

export const DefinitionList = props => {

  const { definitions, feature, contextRef, styles=noOpObj } = props
  const { lookup, ...groupedDefs } = useDefinitionGroups(definitions)

  const onItemPress = useCallback((item, event) => {
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