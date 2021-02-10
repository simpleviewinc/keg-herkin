import React from "react"
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components/view'
import { Text } from '@keg-hub/keg-components/text'
import { Row } from '@keg-hub/keg-components/row'
import { Grid } from '@keg-hub/keg-components/grid'
import { Surface } from 'SVComponents/surface'
import { AceEditor } from 'SVComponents/aceEditor'
import { checkCall } from '@keg-hub/jsutils'

export const ToRun = props => {
  const { styles, tests, editorRef, title, prefix, toggleHandel } = props

  return (
    <Surface
      className={`runner-main`}
      title={title}
      capitalize={false}
      styles={styles.main}
      prefix={prefix || 'Runner'}
      toggleHandel={toggleHandel}
    >
      <Grid className={`runner-grid`} style={styles?.toRun?.grid} >
        <Row className='runner-torun' style={styles?.toRun?.row} >
          <AceEditor
            aceRef={editorRef}
            onChange={text => checkCall(props.onChange, text)}
            editorId={`runner-tests-editor`}
            value={tests || ''}
            style={styles.toRun.editor}
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
        </Row>
      </Grid>
    </Surface>
  )
} 