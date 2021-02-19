import React from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { CodeEditor } from 'SVComponents/codeEditor'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants'

const { CATEGORIES } = Values

export const EditorScreen = props => {
  const styles = useStyle(`screens.editors.main`)
  const { activeFile } = useStoreItems([CATEGORIES.ACTIVE_FILE])

  return (
    <View
      className={`editors-screen`}
      style={styles}
    >
      <CodeEditor activeFile={activeFile} />
    </View>
  )
}