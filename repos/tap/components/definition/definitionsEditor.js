import { Values } from 'SVConstants'
import React, { useState } from 'react'
import { noOpObj } from '@keg-hub/jsutils'
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
    feature,
    featureEditorRef,
    list,
    styles=noOpObj,
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
          feature={feature}
          definitions={active}
          styles={styles.active}
          featureEditorRef={featureEditorRef}
        />
      )}
      { tab === DEFINITION_TABS.LIST  && (
        <DefinitionList
          feature={feature}
          definitions={list}
          styles={styles.list}
          contextRef={featureEditorRef}
        />
      )}
    </View>
  )

}
