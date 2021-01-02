import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { CodeEditor } from 'SVComponents/codeEditor'


export const EditorScreen = props => {
  const theme = useTheme()

  return (
    <View
      className={`editors-screen`}
      style={theme.get(`screens.editors.main`)}
    >
      <CodeEditor />
    </View>
  )
}