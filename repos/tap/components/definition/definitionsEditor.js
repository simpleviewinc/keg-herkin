import { Values } from 'SVConstants'
import React from 'react'
import { noOpObj } from '@keg-hub/jsutils'
import { View } from '@keg-hub/keg-components'
import { DefinitionList } from './definitionList'
import { DefinitionTabs } from './definitionTabs'
import { useActiveTab } from 'SVHooks/useActiveTab'
import { ActiveDefinitionsEditor } from './activeDefinitionsEditor'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useFeature } from 'SVHooks/useFeature'

const { DEFINITION_TABS, CATEGORIES } = Values

/**
 * DefinitionsEditor
 * @param {Object} props 
 * @param {Array=} props.active - list of active definitions
 * @param {String} props.activeTab
 * @param {Object=} props.list - list of all definitions
 * @param {Object=} props.styles
 * @param {Object=} props.activeFile
 * @param {Object} props.featureEditorRef
 * @param {Object} props.feature
 */
export const DefinitionsEditor = props => {
  const {
    activeTab,
    active,
    featureEditorRef,
    feature,
    activeFile,
    list,
    styles=noOpObj,
    ...args
  } = props

  const { definitions } = useStoreItems([ CATEGORIES.DEFINITIONS ])
  const [tab, setTab] = useActiveTab(activeTab || DEFINITION_TABS.ACTIVE)
  const { definitions: activeDefs } = useFeature({ path: activeFile?.location }) || {}

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
          featureEditorRef={featureEditorRef}
          styles={styles.active}
          definitions={active || activeDefs}
        />
      )}
      { tab === DEFINITION_TABS.LIST  && (
        <DefinitionList
          feature={feature}
          contextRef={featureEditorRef}
          styles={styles.list}
          definitions={list || definitions}
        />
      )}
    </View>
  )

}
