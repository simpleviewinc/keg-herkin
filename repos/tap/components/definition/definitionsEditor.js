import { Values } from 'SVConstants'
import React, { useState, useEffect } from 'react'
import { noOpObj } from '@keg-hub/jsutils'
import { View } from '@keg-hub/keg-components'
import { DefinitionList } from './definitionList'
import { DefinitionTabs } from './definitionTabs'
import { useActiveTab } from 'SVHooks/useActiveTab'
import { ActiveDefinitionsEditor } from './activeDefinitionsEditor'

const { DEFINITION_TABS, STEP_TYPES } = Values

const getDefinitionIdFromText = (feature, text, definitions) => {
  const matchingStep = feature.scenarios.reduce((found, scenario) => {
    return found || scenario.steps.find(step => step.step === text)
  }, false)
} 

export const DefinitionsEditor = props => {
  const {
    activeTab=DEFINITION_TABS.ACTIVE,
    // activeTab=DEFINITION_TABS.LIST,
    active,
    feature,
    featureEditorRef,
    list,
    styles=noOpObj,
    ...args
  } = props

  const [tab, setTab] = useActiveTab(activeTab)

  useEffect(() => {
    if(tab === DEFINITION_TABS.LIST) return

    const editor = featureEditorRef.current.editor
    editor.session.selection.on('changeCursor', () => {
      // const cursorPos = editor.getCursorPosition()
      const lineContent = editor.session.getLine(editor.getSelectionRange().start.row)
      const [ type, ...content ] = lineContent.trim().split(' ')

      getDefinitionIdFromText(feature, content.join(' '), active)

    })

  }, [
    tab,
    active,
    feature,
    featureEditorRef.current
  ])

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
