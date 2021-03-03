import { useParentMethods } from 'SVHooks'
import { useStyle } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import React from 'react'
import { Runner } from 'SVComponents/runner/runner'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants'
import { capitalize } from '@keg-hub/jsutils'
import { useActiveFile } from 'SVHooks/useActiveFile'


const { CATEGORIES } = Values

export const RunnerScreen = props => {
  const builtStyles = useStyle(`screens.runner`)
  const parentMethods = useParentMethods()
  const activeFile = useActiveFile()

  return (
    <View
      className={`runner-screen`}
      style={builtStyles.main}
    >
      <Runner
        activeFile={activeFile}
        tests={activeFile?.modified || activeFile?.content || ''}
        title={capitalize(activeFile?.fileType || '')}
        parentMethods={parentMethods}
      />
    </View>
  )
}
