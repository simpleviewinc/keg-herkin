import React from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { checkCall, noOpObj } from '@keg-hub/jsutils'
import { View, H5 } from '@keg-hub/keg-components'
import { AceEditor } from 'SVComponents/aceEditor'
import { useActiveDefinition } from 'SVHooks/useActiveDefinition'
import { Values } from 'SVConstants'
const { SCREENS } = Values

const NoActiveDefinitions = ({ styles=noOpObj }) => {
  return (
    <View
      className={'empty-definitions-main'}
      style={styles.main}
    >
      <H5
        className={'empty-definitions-text'}
        style={styles.text}
      >
        No Active Definition
      </H5>
    </View>
  )
}

export const ActiveDefinitionsEditor = props => {
  const {
    definitions,
    styles=noOpObj,
    ...args
  } = props

  const activeStyles = useStyle(`definitions.active`, styles)
  const definition = useActiveDefinition(SCREENS.EDITOR)

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
      : (<NoActiveDefinitions styles={activeStyles.none} />)
}