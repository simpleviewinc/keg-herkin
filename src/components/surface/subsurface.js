import { Drawer } from 'SVComponents'
import { Subheader } from '../subheader'
import { useTheme } from '@keg-hub/re-theme'
import { noOpObj } from 'SVUtils/helpers'
import React, { useState, useCallback, useMemo } from 'react'
import { Grid, Row, View, Touchable, Text, Icon } from '@keg-hub/keg-components'
// import { Plus, Minus } from 'SVAssets'


const useAnimationStyles = (toggled, styles) => {
  return useMemo(() => {
    const toggleStyles = toggled ? styles?.open : styles?.closed
    return {
      main: {
        ...styles?.default?.main,
        ...toggleStyles?.main
      },
    //  icon: {
    //     icon: {
    //       transitionProperty: 'transform',
    //       transitionDuration: '0.8s',
    //       transform: toggled ? 'rotate(180deg)' : 'rotate(0deg)',
    //       ...styles?.default?.icon,
    //       ...toggleStyles?.icon
    //     }
    //   },
      text: {
        ...styles?.default?.text,
        ...toggleStyles?.text
      },
    }
  }, [ toggled, styles ])
}

const DrawerToggle = ({ onPress, toggled, styles }) => {
  const iconStyles = useAnimationStyles(toggled, styles?.toggle)

  return (
    <Touchable
      className={`toggle-action`}
      onPress={onPress}
      style={iconStyles?.main}
    >
      <Text
        className={`toggle-text`}
        style={iconStyles?.text}
      >
        {toggled ? ' Hide' : ' Show'}
      </Text>
    </Touchable>
  )
}


export const SubSurface = props => {

  const {
    title,
    prefix,
    children,
    initialToggle,
    styles=noOpObj,
    classNames=noOpObj,
  } = props

  const theme = useTheme()
  const surfaceStyles = theme.get('subsurface', styles)

  const [ toggled, setToggled ] = useState(initialToggle || true)

  const onTogglePress = useCallback(event => {
    setToggled(!toggled)
  }, [ toggled, setToggled ])

  return (
    <Grid
      className={classNames.main}
      style={surfaceStyles.main}
    >
      <Row
        className={classNames.headerRow}
        style={surfaceStyles.headerRow}
      >
        <Subheader
          classNames={classNames.header}
          styles={surfaceStyles.header}
          prefix={prefix}
          title={title}
        >
          <DrawerToggle
            onPress={onTogglePress}
            toggled={toggled}
            styles={surfaceStyles}
          />
        </Subheader>
      </Row>
      <Drawer
        className='sub-surface-drawer'
        styles={ surfaceStyles.drawer }
        toggled={ toggled }
      >
        <Row
          className={classNames.containerRow}
          style={surfaceStyles.containerRow}
        >
          <View
            className={classNames.container}
            style={surfaceStyles.container}
          >
            {children}
          </View>
        </Row>
      </Drawer>
    </Grid>
  )
}