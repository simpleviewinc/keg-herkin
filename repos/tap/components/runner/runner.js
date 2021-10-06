import React, { useCallback, useState, useMemo } from "react"
import { noOp } from '@keg-hub/jsutils'
import { getBaseApiUrl } from 'SVUtils/api'
import { Iframe } from 'SVComponents/iframe/iframe'
import { IframeHeader } from 'SVComponents/iframe/iframeHeader'
import { ExternalLink } from 'SVAssets/icons'
import { Surface } from 'SVComponents/surface'
import { Loading, View, Text, TouchableIcon } from '@keg-hub/keg-components'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'
import { Values } from 'SVConstants'
import { RunnerTabs } from './runnerTabs'
import { useStyle } from '@keg-hub/re-theme'


const { SCREENS } = Values

const useTabSelect = (activeTab, setActiveTab) => useCallback(tab => {
  activeTab !== tab && setActiveTab(tab)
  return true
}, [activeTab, setActiveTab])

export const Runner = props => {

  const {
    activeFile,
    autoRun=false,
    activeTab,
    parentMethods,
    prefix,
    onExternalOpen,
    styles,
    tests,
    title,
  } = props

  const runnerStyles = useStyle('runner', styles)
  const [tab, setTab] = useState(activeTab)
  const tabSelect = useTabSelect(tab, setTab)

  // TODO: Add VNC screenCast here code here
  // Remove from results screen
  return (
    <>
      <Surface
        prefix={'Test Results'}
        TitleComponent={({styles:textStyles, ...props}) => 
          <IframeHeader
            {...props}
            onExternalOpen={onExternalOpen}
            mainTextStyles={textStyles}
            mainStyles={styles?.iFrame?.header} 
          />
        }
        capitalize={false}
        title={'Report'}
        styles={styles?.iFrame?.surface}
        className={`runner-surface-iframe`}
      >
        {/* Add ScreenCast IFrame here */}
      </Surface>
      <RunnerTabs
        activeTab={tab}
        onTabSelect={tabSelect}
      />
    </>
  )
}
