import { Drawer } from 'SVComponents'
import { Subheader } from '../subheader'
import { useTheme } from '@keg-hub/re-theme'
import { noOpObj } from 'SVUtils/helpers'
import { useToggledStyles } from 'SVHooks/useToggledStyles'
import React, { useState, useCallback, useMemo } from 'react'
import { Grid, Row, View, Touchable, Text, Icon } from '@keg-hub/keg-components'
// import { Plus, Minus } from 'SVAssets'

const DrawerToggle = ({ onPress, toggled, toggleDisabled, styles }) => {
  const iconStyles = useToggledStyles(toggled, styles?.toggle)

  return !toggleDisabled && (
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
  ) || null
}


export const SubSurface = props => {

  const {
    title,
    prefix,
    children,
    initialToggle,
    styles=noOpObj,
    toggleDisabled,
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
            toggleDisabled={toggleDisabled}
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