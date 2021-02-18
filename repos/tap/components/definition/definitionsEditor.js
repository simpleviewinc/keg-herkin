import { Values } from 'SVConstants'
import React, { useState } from 'react'
import { noPropObj } from '@keg-hub/jsutils'
import { View } from '@keg-hub/keg-components'
import { DefinitionList } from './definitionList'
import { DefinitionTabs } from './definitionTabs'
import { useActiveTab } from 'SVHooks/useActiveTab'
import { ActiveDefinitionsEditor } from './activeDefinitionsEditor'

const { DEFINITION_TABS } = Values

export const DefinitionsEditor = props => {
  const {
    // activeTab=DEFINITION_TABS.ACTIVE,
    activeTab=DEFINITION_TABS.LIST,
    active,
    list,
    styles=noPropObj,
    ...args
  } = props

  const [tab, setTab] = useActiveTab(activeTab)

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
          styles={styles}
          definitions={active}
        />
      )}
      { tab === DEFINITION_TABS.LIST  && (
        <DefinitionList
          styles={styles}
          definitions={list}
        />
      )}
    </View>
  )

}
