import React from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { checkCall, noOpObj } from '@keg-hub/jsutils'
import { View, H5 } from '@keg-hub/keg-components'
import { AceEditor } from 'SVComponents/aceEditor'

const NoActiveDefinitions = ({ style=noOpObj }) => {
  return (
    <View
      className={'empty-definitions-main'}
      style={style.main}
    >
      <H5
        className={'empty-definitions-text'}
        style={style.text}
      >
        No Active Definitions
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

  return definitions
    ? definitions.map(def => {
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
                wrapBehavioursEnabled: true,
                animatedScroll: false,
                dragEnabled: false,
                tabSize: 2,
                wrap: true,
                ...props.editorProps,
              }}
            />
          )
        })
      : (<NoActiveDefinitions style={styles.empty} />)
}