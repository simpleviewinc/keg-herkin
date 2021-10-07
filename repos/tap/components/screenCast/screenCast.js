import React, { useCallback, useState, useMemo } from "react"
import { View } from 'SVComponents'
import { Values } from 'SVConstants'
import { noOp } from '@keg-hub/jsutils'
import { Resizable } from 're-resizable'
import { Surface } from 'SVComponents/surface'
import { ScreencastTabs } from './screencastTabs'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { Iframe } from 'SVComponents/iframe/iframe'
import { useResizeProps } from 'SVHooks/useResizeProps'
import { useStyle, useDimensions } from '@keg-hub/re-theme'
import { useScreenCastUrl } from 'SVHooks/useScreenCastUrl'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'

const { SCREENS, VERTICAL_BAR_HEIGHTS } = Values

const SCContainer = reStyle(View)({
  height: `calc(100vh - ${VERTICAL_BAR_HEIGHTS}px)`,
})

const SCSurface = reStyle(Surface, 'styles')({
  main: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  }
})

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
  const resizeProps = useResizeProps({ diffHeight: VERTICAL_BAR_HEIGHTS })

  // TODO: Add endpoint to api to allow starting the browser
  // Add actions to ScreencastTabs to call endpoints
  const screencastUrl = useScreenCastUrl()

  return (
    <SCContainer>
      <Resizable {...resizeProps}>
        <SCSurface
          prefix={'Screencast'}
          capitalize={false}
          title={'Test Runner'}
          styles={scStyles?.surface}
          className={`runner-surface-screen-cast`}
        >
          <Iframe
            src={screencastUrl}
            styles={scStyles?.iFrame}
          />
        </SCSurface>
        <ScreencastTabs
          activeTab={tab}
          onTabSelect={tabSelect}
        />
      </Resizable>
    </SCContainer>
  )
}
