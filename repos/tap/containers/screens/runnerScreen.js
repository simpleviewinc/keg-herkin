import React from 'react'
import { Values } from 'SVConstants'
import { useParentMethods } from 'SVHooks'
import { EmptyScreen } from './emptyScreen'
import { useStyle } from '@keg-hub/re-theme'
import { capitalize } from '@keg-hub/jsutils'
import { View } from '@keg-hub/keg-components'
import { Runner } from 'SVComponents/runner/runner'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

const { CATEGORIES } = Values

export const RunnerScreen = props => {
  const builtStyles = useStyle(`screens.runner`)
  const parentMethods = useParentMethods()
  const activeFile = useActiveFile(props.id)

  return !activeFile?.fileType
    ? (<EmptyScreen message={'No file selected!'} />)
    : (
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
