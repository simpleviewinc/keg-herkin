import React, { useCallback } from 'react'
import { Cog } from 'SVAssets/icons'
import { setActiveModal } from 'SVActions/modals'
import { useThemeHover, useStyle } from '@keg-hub/re-theme'
import { AppHeader, View, Text, H5, Button, TouchableIcon } from 'SVComponents'
import { Values } from 'SVConstants'
const { MODAL_TYPES } = Values

const IconComponent = ({ styles, size, stroke, fill }) => {
  return (
    <View style={styles.container} >
      <Cog
        size={size}
        stroke={stroke}
        fill={fill}
        style={styles.icon}
      />
      <Text style={styles.text} >
        SETTINGS
      </Text>
    </View>
  )
}

const ToggleSettings = ({ styles }) => {

  const [ref, toggleStyles] = useThemeHover(styles?.right?.default, styles?.right?.hover)
  const iconSize = toggleStyles.icon?.ftSz || toggleStyles.icon?.fontSize || 20
  const iconStroke = toggleStyles.icon?.c || toggleStyles.icon?.color

  const onPress = useCallback(() => {
    setActiveModal(MODAL_TYPES.TEST_SELECTOR)
  }, [])

  return (
    <View ref={ref} style={toggleStyles.main} >
      <TouchableIcon
        Component={(
          <IconComponent 
            size={iconSize}
            stroke={iconStroke}
            fill={iconStroke}
            styles={toggleStyles}
          />
        )}
        onPress={onPress}
        touchStyle={toggleStyles.touch}
      />
    </View>
  )
}


/**
 * Wraps the component with AppHeader
 *
 * @param {Object} title - title on the app header
 * @param {Object} Component - React component to be wrapped
 *
 * @returns {function} - wrapped functional component
 */
export const withAppHeader = (title, Component) => {
  const AppHeaderHoc = props => {
    const styles = useStyle('appHeader', props.styles)
    return (
      <>
        <AppHeader
          styles={ styles.main }
          LeftComponent={(
            <View
              className='header-left-component'
              style={ styles.left.main }
            >
              <H5
                className='header-left-title'
                style={ styles.left.content.title }
              >
                { title }
              </H5>
            </View>
          )}
          RightComponent={(<ToggleSettings styles={styles} />)}
        />
        <Component {...props} />
      </>
    )
  }

  return AppHeaderHoc
}
