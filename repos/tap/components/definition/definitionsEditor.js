import React from 'react'
import { Values } from 'SVConstants'
import { Sync } from 'SVAssets/icons'
import { noOpObj } from '@keg-hub/jsutils'
import { useStyle, useThemeHover } from '@keg-hub/re-theme'
import { Surface } from 'SVComponents/surface'
import { DefinitionList } from './definitionList'
import { DefinitionTabs } from './definitionTabs'
import { useSelector } from 'SVHooks/useSelector'
import { useActiveTab } from 'SVHooks/useActiveTab'
import { Text } from '@keg-hub/keg-components/text'
import { useIconProps } from 'SVHooks/useIconProps'
import { Touchable } from '@keg-hub/keg-components/touchable'
import { ActiveDefinitionsEditor } from './activeDefinitionsEditor'
import { getRemoteDefinitions } from 'SVActions/definitions/api/getRemoteDefinitions'

const { DEFINITION_TABS, CATEGORIES } = Values

const ReloadDefs = props => {
  const reloadStyles = useStyle('definitions.reload')
  const [ syncRef, syncStyles ] = useThemeHover(reloadStyles.default, reloadStyles.hover)
  const iconProps = useIconProps(props, syncStyles.icon)
  
  return (
    <Touchable
      ref={syncRef}
      style={syncStyles.main}
      onPress={getRemoteDefinitions}
    >
      <Sync {...iconProps} />
      <Text style={syncStyles.text} >
        SYNC
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

  return (
    <Surface
      hasToggle={true}
      capitalize={false}
      title={'Definitions'}
      styles={styles}
      RightComponent={ReloadDefs}
      className={`definitions-surface-main`}
      prefix={tab === DEFINITION_TABS.ACTIVE ? 'Editor' : 'List'}
    >
      <DefinitionTabs
        activeTab={tab}
        onTabSelect={setTab}
      />
      { tab === DEFINITION_TABS.ACTIVE  && (
        <ActiveDefinitionsEditor
          featureEditorRef={featureEditorRef}
          styles={styles.active}
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
