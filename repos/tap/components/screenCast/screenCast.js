import React, { useCallback, useState, useMemo } from "react"
import { noOp } from '@keg-hub/jsutils'
import { getBaseApiUrl } from 'SVUtils/api'
import { Iframe } from 'SVComponents/iframe/iframe'
import { Surface } from 'SVComponents/surface'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'
import { Values } from 'SVConstants'
import { ScreencastTabs } from './screencastTabs'
import { useStyle } from '@keg-hub/re-theme'

const { SCREENS } = Values


/**
 * TODO: Create a new tab for viewing the browser in a iframe
 * Or Investigate some type of slide out that shows the iframe
 * src={`http://0.0.0.0:5005/novnc/vnc_auto.html?host=0.0.0.0&port=26369`}
 
      src={`http://0.0.0.0:5005/novnc/vnc_lite.html?host=0.0.0.0&port=26367`}
 
*/

const useTabSelect = (activeTab, setActiveTab) => useCallback(tab => {
  activeTab !== tab && setActiveTab(tab)
  return true
}, [activeTab, setActiveTab])

export const Screencast = props => {

  const {
    activeFile,
    autoRun=false,
    activeTab,
    parentMethods,
    prefix,
    styles,
    tests,
    title,
  } = props

  const screencastStyles = useStyle('runner', styles)
  const [tab, setTab] = useState(activeTab)
  const tabSelect = useTabSelect(tab, setTab)

  return (
    <>
      <Surface
        prefix={'Screencast'}
        capitalize={false}
        title={'Test Runner'}
        styles={styles?.iFrame?.surface}
        className={`runner-surface-screen-cast`}
      >
        <Iframe
          {...props}
          styles={screencastStyles?.screenCast}
        />
      </Surface>
      <ScreencastTabs
        activeTab={tab}
        onTabSelect={tabSelect}
      />
    </>
  )
}
