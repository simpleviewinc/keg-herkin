import React from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { checkCall, noOpObj } from '@keg-hub/jsutils'
import { View, H5 } from '@keg-hub/keg-components'
import { AceEditor } from 'SVComponents/aceEditor'
import { NoActiveDefinition } from './noActiveDefinition'
import { useAltActiveFile } from 'SVHooks/useAltActiveFile'
import { Values } from 'SVConstants'
const { SCREENS, FILE_TYPES } = Values

/**
 * ActiveDefinitionsEditor - Renders an editor to modify a definition file
 * @param {Object} props
 * @param {Array} props.definitions - Loaded definition for the backend as fileModels
 * @param {Object} props.styles - Custom styles for displaying the component
 *
 * @returns {Component}
 */
export const ActiveDefinitionsEditor = props => {
  const {
    definitions,
    styles=noOpObj,
    ...args
  } = props

  const activeStyles = useStyle(`definitions.active`, styles)
  const definition = useAltActiveFile(SCREENS.EDITOR, FILE_TYPES.DEFINITION)

  return definition
    ? (
        <AceEditor
          key={definition.keyId || definition.uuid}
          fileId={definition.uuid}
          {...props}
          onChange={text => checkCall(props.onChange, definition.uuid, text)}
          editorId={`definition-editor-${definition.uuid}`}
          value={definition.content || ''}
          style={styles.editor}
          mode='javascript'
          editorProps={{
            wrapBehavioursEnabled: true,
            animatedScroll: false,
            dragEnabled: false,
            tabSize: 2,
            wrap: true,
            ...props.editorProps,
          }}
        />
      )
      : (<NoActiveDefinition styles={activeStyles.none} />)
}