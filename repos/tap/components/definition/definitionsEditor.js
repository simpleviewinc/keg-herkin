import React from 'react'
import { Values } from 'SVConstants'
import { Sync } from 'SVAssets/icons'
import { noOpObj } from '@keg-hub/jsutils'
import { Surface } from 'SVComponents/surface'
import { useFeature } from 'SVHooks/useFeature'
import { DefinitionList } from './definitionList'
import { DefinitionTabs } from './definitionTabs'
import { useSelector } from 'SVHooks/useSelector'
import { useActiveTab } from 'SVHooks/useActiveTab'
import { Text } from '@keg-hub/keg-components/text'
import { Touchable } from '@keg-hub/keg-components/touchable'
import { ActiveDefinitionsEditor } from './activeDefinitionsEditor'

const { DEFINITION_TABS, CATEGORIES } = Values

const ReloadDefs = props => {
  // TODO: add re-sync actions for definitions

  return (
    <Touchable
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <Sync
        style={{
          fontSize: 14,
          marginRight: 5,
        }}
      />
      <Text
        style={{
          fontSize: 10,
        }}
      >
        RE-SYNC
      </Text>
    </Touchable>
  )

}

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

  const { definitionTypes } = useSelector(CATEGORIES.DEFINITION_TYPES)
  const [tab, setTab] = useActiveTab(activeTab || DEFINITION_TABS.LIST)
  const { definitions: activeDefs } = useFeature({ path: activeFile?.location }) || {}

  return (
    <Surface
      prefix={'Editor'}
      hasToggle={true}
      capitalize={false}
      title={'Definitions'}
      styles={styles}
      RightComponent={ReloadDefs}
      className={`definitions-surface-main`}
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
          definitions={list || definitionTypes}
        />
      )}
    </Surface>
  )

}
