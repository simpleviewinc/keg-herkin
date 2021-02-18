import React from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { CodeEditor } from 'SVComponents/codeEditor'


export const EditorScreen = props => {
  const styles = useStyle(`screens.editors.main`)

  return (
    <View
      className={`editors-screen`}
      style={styles}
    >
      <CodeEditor />
    </View>
  )
}