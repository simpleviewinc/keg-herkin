import React from 'react'
import { checkCall } from '@keg-hub/jsutils'
import { View } from '@keg-hub/keg-components'
import { AceEditor } from 'SVComponents/aceEditor'

export const DefinitionsEditor = ({ definitions, styles, ...props }) => {
  return (
    <View
      className='definitions-editors-wrapper'
      style={styles.main}
    >
      {definitions && definitions.map(def => {
          return (
            <AceEditor
              key={def.uuid}
              {...props}
              onChange={text => checkCall(props.onChange, def.uuid, text)}
              editorId={`definition-editor-${def.uuid}`}
              value={def.content || ''}
              style={styles.editor}
              mode='javascript'
              editorProps={{
                wrapBehavioursEnabled: false,
                animatedScroll: false,
                dragEnabled: false,
                tabSize: 2,
                wrap: true,
                ...props.editorProps,
              }}
            />
          )
        })}
    </View>
  )
}
