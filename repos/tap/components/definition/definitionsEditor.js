import { Values } from 'SVConstants'
import React, { useState } from 'react'
import { noOpObj } from '@keg-hub/jsutils'
import { View } from '@keg-hub/keg-components'
import { DefinitionList } from './definitionList'
import { DefinitionTabs } from './definitionTabs'
import { useActiveTab } from 'SVHooks/useActiveTab'
import { ActiveDefinitionsEditor } from './activeDefinitionsEditor'
import { useActiveTab } from 'SVHooks/useActiveTab'

const { DEFINITION_TABS, CATEGORIES } = Values

/**
 * DefinitionsEditor
 * @param {Object} props 
 * @param {Array=} props.active - list of active definitions
 * @param {String} props.activeTab
 * @param {Object=} props.list - list of all definitions
 * @param {Object=} props.styles
 * @param {Object=} props.activeFile
 */
export const DefinitionsEditor = props => {
  const {
    // activeTab=DEFINITION_TABS.ACTIVE,
    activeTab=DEFINITION_TABS.LIST,
    active,
    activeFile,
    list,
    styles=noOpObj,
    ...args
  } = props

  const { definitions } = useStoreItems([ CATEGORIES.DEFINITIONS ])
  const [tab, setTab] = useActiveTab(activeTab)
  const { definitions: activeDefs } = useFeature({path: activeFile?.fullPath}) || {}

  return (
    <View
      className={'definitions-editor-main'}
      style={styles.main}
    >
      <DefinitionTabs
        activeTab={tab}
        onTabSelect={setTab}
      />
      { tab === DEFINITION_TABS.ACTIVE  && (
        <ActiveDefinitionsEditor
          styles={styles.active}
          definitions={active || activeDefs}
        />
      )}
      { tab === DEFINITION_TABS.LIST  && (
        <DefinitionList
          styles={styles.list}
          definitions={list || definitions}
        />
      )}
    </View>
  )

}
