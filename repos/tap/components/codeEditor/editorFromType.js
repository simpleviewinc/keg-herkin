
import { Values } from 'SVConstants'
import { noOpObj, exists } from '@keg-hub/jsutils'
import { AceEditor } from 'SVComponents/aceEditor'
import React, { useRef, useCallback } from 'react'
import { usePendingCallback } from 'SVHooks/usePendingCallback'
import { FeatureEditor } from 'SVComponents/feature/featureEditor'
import { DefinitionsEditor } from 'SVComponents/definition/definitionsEditor'

const { EDITOR_TABS, SCREENS } = Values

export const EditorFromType = props => {
  const { aceRef, activeFile=noOpObj, editorType, ...otherProps } = props
  const onChange = usePendingCallback(activeFile, SCREENS.EDITOR)

  switch(editorType){
    case EDITOR_TABS.FEATURE.id: {
      return (
        <FeatureEditor
          {...otherProps}
          activeFile={activeFile}
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
          fileId={activeFile?.location}
        />
      )
    } 
  }

}