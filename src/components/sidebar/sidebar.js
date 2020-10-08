import { Drawer, Touchable, Text, View } from 'SVComponents'
import React, { useState, useCallback } from 'react'
import { useToggledStyles } from 'SVHooks/useToggledStyles'

const DrawerToggle = ({ onPress, toggled, styles }) => {
  const toggleStyles = useToggledStyles(toggled, styles?.toggle)

  return (
    <Touchable
      className={`toggle-action`}
      onPress={onPress}
      style={toggleStyles?.main}
    >
      <Text
        className={`toggle-text`}
        style={toggleStyles?.text}
      >
        Toggle
      </Text>
    </Touchable>
  )
}

export const Sidebar = props => {
  const { children, initialToggle, styles } = props
  const [ toggled, setToggled ] = useState(initialToggle || true)

  const onTogglePress = useCallback(event => {
    setToggled(!toggled)
  }, [ toggled, setToggled ])

  return (
    <View  className='sidebar-main' style={styles.main}>
      <Drawer
        className='sub-surface-drawer'
        styles={ styles.drawer }
        toggled={ toggled }
      >
        { children }
      </Drawer>
      <DrawerToggle
        onPress={onTogglePress}
        toggled={toggled}
        styles={styles.toggle}
      />
    </View>
  )
}