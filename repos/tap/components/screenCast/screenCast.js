import React, { useCallback, useState, useMemo, useEffect, useRef } from "react"
import { View } from 'SVComponents'
import { Values } from 'SVConstants'
import { noOp, noOpObj } from '@keg-hub/jsutils'
import { Resizable } from 're-resizable'
import { Surface } from 'SVComponents/surface'
import { ScreencastTabs } from './screencastTabs'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { useResizeProps } from 'SVHooks/useResizeProps'
import { useStyle, useDimensions } from '@keg-hub/re-theme'
import { useScreencastUrl } from 'SVHooks/useScreencastUrl'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'
import { Canvas } from './canvas'
import { useNoVnc } from 'SVHooks/useNoVnc'

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

  const canvasRef = useRef(null)
  const screencastUrl = useScreencastUrl()

  const { noVnc } = useNoVnc(
    canvasRef && canvasRef.current,
    screencastUrl,
    noOpObj
  )

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
          <Canvas
            ref={canvasRef}
            style={scStyles?.canvas}
          />
        </SCSurface>
        <ScreencastTabs
          noVnc={noVnc}
          activeTab={tab}
          canvasRef={canvasRef}
          onTabSelect={tabSelect}
        />
      </Resizable>
    </SCContainer>
  )
}
