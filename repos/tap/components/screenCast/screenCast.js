import React, { useCallback, useState, useMemo } from "react"
import { noOp } from '@keg-hub/jsutils'
import { getBaseApiUrl } from 'SVUtils/api'
import { Iframe } from 'SVComponents/iframe/iframe'
import { Surface } from 'SVComponents/surface'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'
import { Values } from 'SVConstants'
import { ScreencastTabs } from './screencastTabs'
import { useStyle, useDimensions } from '@keg-hub/re-theme'
import { Resizable } from 're-resizable'
import { reStyle } from '@keg-hub/re-theme/reStyle'

const { SCREENS } = Values


// TODO: Resize Style updates
const ScreenCastFrame = reStyle(Iframe, 'styles')((theme, props) => {
  return {
  // Max height minus the top and bottom tab-bars
  // maxHeight: `calc(100vh - 215px)`
  }
})

/**
 * TODO: Create a new tab for viewing the browser in a iframe
 * Or Investigate some type of slide out that shows the iframe
 * src={`http://0.0.0.0:5005/novnc/vnc_auto.html?host=0.0.0.0&port=26369`}
 
      src={`http://0.0.0.0:5005/novnc/vnc_lite.html?host=0.0.0.0&port=26367`}
 
*/

const useResizeDimensions = () => {
  const dims = useDimensions()
  console.log(`---------- dims ----------`)
  console.log(dims)
  return useMemo(() => {
    
  }, [dims])
}

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

  const scStyles = useStyle('screencast', styles)
  const [tab, setTab] = useState(activeTab)
  const tabSelect = useTabSelect(tab, setTab)
  // TODO: update to make novnc url dynamic
  // Add endpoint to api to allow starting the browser
  // Add actions to ScreencastTabs to call endpoints
  const screencastUrl = `http://0.0.0.0:5005/novnc/vnc_auto.html?host=0.0.0.0&port=26369`

  return (
    <Resizable
      defaultSize={{
        // TODO: Resize Style updates
        // height: `calc(100vh - 215px)`,
        // height: '100%',
        // height: 'auto',
        // height: '50%',
        // TODO: Make this 800 dynamic via RN Dimensions API
        height: 800,
        width: '100%',
      }}
    >
      <Surface
        prefix={'Screencast'}
        capitalize={false}
        title={'Test Runner'}
        styles={{
          // TODO: Resize Style updates
          // Move styles to theme or restyles
          ...scStyles?.surface,
          main: {
            height: '100%',
            width: '100%',
            // maxHeight: `calc(100vh - 215px)`,
            overflow: 'hidden',
          }
        }}
        className={`runner-surface-screen-cast`}
      >
        <ScreenCastFrame
          src={screencastUrl}
          styles={scStyles?.iFrame}
        />
      </Surface>
      <ScreencastTabs
        activeTab={tab}
        onTabSelect={tabSelect}
      />
    </Resizable>
  )
}
