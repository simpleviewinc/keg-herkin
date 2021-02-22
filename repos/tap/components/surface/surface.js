import React, { useCallback, useState, useEffect } from 'react'
import { wordCaps, checkCall, exists } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import { DrawerToggle } from './drawerToggle'
import { Section, ItemHeader, Row, H3, Text } from 'SVComponents'
import { Drawer } from 'SVComponents'

const SurfaceHeader = props => {
  const {
    capitalize=true,
    prefix,
    styles,
    title,
    titleStyle,
    toggled,
    onTogglePress,
    toggleDisabled,
  } = props

  return (
    <ItemHeader
      className='surface-header'
      styles={styles?.itemHeader}
      CenterComponent={(
        <H3 style={styles?.heading} >
          { prefix &&  (
            <Text style={styles?.prefix}>
              {prefix}
            </Text>
          )}
          { title && (
            <>
              <Text style={styles?.prefix}> - </Text>
              <Text style={[styles?.title, titleStyle]}>
                { capitalize ? wordCaps(`${title}`) : title }
              </Text>
            </>
          )}
        </H3>
      )}
      RightComponent={(
          <DrawerToggle
            onPress={onTogglePress}
            toggled={toggled}
            styles={styles}
            toggleDisabled={toggleDisabled}
            icons={true}
          />
      )}
    />
  )
}

export const Surface = props => {
  const {
    capitalize,
    prefix,
    styles,
    title,
    titleStyle,
    toggleHandel,
    initialToggle,
    toggleDisabled,
  } = props
  
  const surfaceStyles = useStyle('surface', styles)

  const [ toggled, setToggled ] = useState(initialToggle || true)

  const onTogglePress = useCallback((event, setValue) => {
    const value = exists(setValue) ? setValue : !toggled

    setToggled(value)
  }, [ toggled, setToggled ])

  useEffect(() => {
    checkCall(toggleHandel, setToggled)
  }, [toggleHandel, setToggled])

  return (
    <Section className='surface' style={surfaceStyles?.main} >
      {(title || prefix) && (<SurfaceHeader
        title={title}
        titleStyle={titleStyle}
        prefix={prefix}
        capitalize={capitalize}
        styles={surfaceStyles?.header}
        toggled={toggled}
        onTogglePress={onTogglePress}
      />)}
      <Drawer
        className='surface-drawer'
        styles={ surfaceStyles.drawer }
        toggled={ toggled }
      >
        <Row className='surface-content' style={surfaceStyles?.content} >
          {props.children}
        </Row>
      </Drawer>
    </Section>
  )
}