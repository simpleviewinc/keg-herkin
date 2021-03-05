
import { Values } from 'SVConstants'
import { noOpObj } from '@keg-hub/jsutils'
import { AceEditor } from 'SVComponents/aceEditor'
import React from 'react'
import { usePendingCallback } from 'SVHooks/usePendingCallback'
import { FeatureEditor } from 'SVComponents/feature/featureEditor'
import { DefinitionsEditor } from 'SVComponents/definition/definitionsEditor'

const { EDITOR_TABS, SCREENS } = Values

export const EditorFromType = props => {
  const { aceRef, activeFile=noOpObj, editorType, ...otherProps } = props
  const onChange = usePendingCallback(SCREENS.EDITOR)

  switch(editorType){
    case EDITOR_TABS.FEATURE.id: {
      return (
        <FeatureEditor
          {...otherProps}
          activeFile={activeFile}
          onChange={onChange}
          aceRef={aceRef}
        />
      )
    }
    case EDITOR_TABS.DEFINITIONS.id: {
      return (
          <DefinitionsEditor
            {...otherProps}
            activeFile={activeFile}
            featureEditorRef={aceRef}
          />
      )
    }
    default: {
      return (
        <AceEditor
          {...otherProps}
          aceRef={aceRef}
          mode={'javascript'}
          activeFile={activeFile}
          onChange={onChange}
          fileId={activeFile?.location}
        />
      )
    } 
  }

}