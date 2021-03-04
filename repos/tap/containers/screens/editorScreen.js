import React from 'react'
import { EmptyScreen } from './emptyScreen'
import { useStyle } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { CodeEditor } from 'SVComponents/codeEditor'
import { useActiveFile } from 'SVHooks/useActiveFile'

/**
 * EditorScreen - Renders code editors based on the type of file selected
 * @param {Object} props
 * @param {String} props.id - Id of the Editor screen
 * @param {Object} props.styles - Custom override styles for the editor
 * @param {Object} props.title - Display name for the screen
 *
 */
export const EditorScreen = props => {
  const styles = useStyle(`screens.editors.main`)
  const activeFile = useActiveFile(props.id)

  return !activeFile?.fileType
    ? (<EmptyScreen message={'No file selected!'} />)
    : (
        <View
          className={`editors-screen`}
          style={styles}
        >
          <CodeEditor activeFile={activeFile} />
        </View>
      )
}