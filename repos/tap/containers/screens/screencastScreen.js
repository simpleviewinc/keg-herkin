import React from 'react'
import { EmptyScreen } from './emptyScreen'
import { useStyle } from '@keg-hub/re-theme'
import { capitalize } from '@keg-hub/jsutils'
import { View } from '@keg-hub/keg-components'
import { Screencast } from 'SVComponents/screencast/screencast'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { CmdOutput } from 'SVComponents/cmdOutput/cmdOutput'
import { Values } from 'SVConstants'

const { SCREENS } = Values

export const ScreencastScreen = props => {
  const builtStyles = useStyle(`screens.screencast`)
  const activeFile = useActiveFile(SCREENS.SCREENCAST)

  return !activeFile?.fileType
    ? (<EmptyScreen message={'No file selected!'} />)
    : (
        <View
          className={`screencast-screen`}
          style={builtStyles.main}
        >
          <CmdOutput activeFile={activeFile} />
          <Screencast
            {...props}
            activeFile={activeFile}
            title={capitalize(activeFile?.fileType || '')}
            tests={activeFile?.modified || activeFile?.content || ''}
            styles={builtStyles}
          />
        </View>
      )
}
