import React, { useState } from 'react'
import { Values } from 'SVConstants'
import { DefinitionList } from './definitionList'
import { DefinitionEditorTabs } from './definitionEditorTabs'
import { ActiveDefinitionsEditor } from './activeDefinitionsEditor'
import { useActiveTab } from 'SVHooks/useActiveTab'

const { DEFINITION_TABS } = Values

export const DefinitionsEditor = props => {
  const {
    activeTab=DEFINITION_TABS.ACTIVE,
    active,
    list,
    styles,
    ...args
  } = props

  const [tab, setTab] = useActiveTab(activeTab)
  
  return (<>
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
    <DefinitionEditorTabs
      activeTab={tab}
      onTabSelect={setTab}
    />
  </>)

}
