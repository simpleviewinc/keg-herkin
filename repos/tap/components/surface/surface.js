import React, { useCallback, useState, useEffect } from 'react'
import { checkCall, exists } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import { DrawerToggle } from './drawerToggle'
import { Section, ItemHeader, Row } from 'SVComponents'
import { Drawer } from 'SVComponents'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'

const SurfaceHeader = props => {
  const {
    capitalize=true,
    prefix,
    styles,
    title,
    titleStyle,
    toggled,
    onTogglePress,
    hasToggle=true,
    toggleDisabled,
    TitleComponent=PrefixTitleHeader
  } = props

  return (
    <ItemHeader
      className='surface-header'
      styles={styles?.itemHeader}
      CenterComponent={(
        <TitleComponent
          styles={styles}
          titleStyle={titleStyle}
          title={title}
          prefix={prefix}
          capitalize={capitalize}
        />
      )}
      RightComponent={hasToggle && (
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
    hasToggle,
    toggleHandel,
    initialToggle,
    toggleDisabled,
    TitleComponent
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
        TitleComponent={TitleComponent}
        title={title}
        titleStyle={titleStyle}
        hasToggle={hasToggle}
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