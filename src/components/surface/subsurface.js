import React, { useState, useCallback } from 'react'
import { Grid, Row, View, Touchable, Text } from '@keg-hub/keg-components'
import { Drawer } from 'SVComponents'
import { Subheader } from '../subheader'
import { useTheme } from '@keg-hub/re-theme'
import { checkCall } from '@keg-hub/jsutils'

const noOpObj = {}
const noOpStyles = noOpObj
const noOpClsNames = noOpObj

const DrawerToggle = ({ onPress, toggled }) => {
  // TODO: update to use Icons
  return (
    <Touchable onPress={onPress}>
      <Text style={{fontSize: 12}} >
        {toggled ? '- Hide' : '+ Show'}
      </Text>
    </Touchable>
  )
}


export const SubSurface = props => {
  const { classNames=noOpClsNames, initialToggle, styles=noOpStyles, title, children } = props
  const theme = useTheme()
  const surfaceStyles = theme.get('subsurface', styles)

  const [ toggled, setToggled ] = useState(initialToggle || true)

  const onTogglePress = useCallback(event => {
    setToggled(!toggled)
  }, [ toggled, setToggled ])


  return (
    <Grid className={classNames.main} style={surfaceStyles.main} >
      <Row className={classNames.headerRow} style={surfaceStyles.headerRow} >
        <Subheader className={classNames.header} style={surfaceStyles.header} >
          {title}
          <DrawerToggle onPress={onTogglePress} toggled={toggled} />
        </Subheader>
      </Row>
      <Drawer
        className='sub-surface-drawer'
        styles={ surfaceStyles?.drawer }
        toggled={ toggled }
      >
        <Row className={classNames.containerRow} style={surfaceStyles.containerRow} >
          <View className={classNames.container} style={surfaceStyles.container} >
            {children}
          </View>
        </Row>
      </Drawer>
    </Grid>
  )
}