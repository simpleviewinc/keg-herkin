import React, { useMemo } from 'react'
import { Icon } from 'SVComponents'
import { isStr } from '@keg-hub/jsutils'
import { Animated } from 'react-native'
import { useToggleAnimate } from 'SVHooks'
import { useTheme } from '@keg-hub/re-theme'

/**
 * Memoizes props for the Icon component
 * @function
 * @param {Object|string} icon - Icon config as an Object or Icon name as a string
 * @param {Object} theme - Global Theme object
 *
 * @returns {Object} - Props to pass to the Icon component
 */
const useIconProps = (icon, theme) => useMemo(() => ({
  name: 'chevron-down',
  color: theme?.colors?.palette?.gray01,
  size: 20,
  ...(icon ? isStr(icon) ? { name: icon } : icon : null)
}), [icon, theme])

/**
 * Memoizes the styles for the icon transform animation
 * @function
 * @param {Object} animation - Instance of Animated.Value
 *
 * @returns {Object} - Styles to pass to the Animated View component
 */
const useTransformStyle = animation => useMemo(() => ({
  transform: [{
    rotate: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })
  }]
}), [animation])

/**
 * Default configuration for the icon toggle animation
 * @object
 */
const toggleConfig = {
  values: { from: 0, to: 1 },
  config: { duration: 400 }
}

/**
 * Function component to render a list header Icon with animation
 * @function
 * @param {Object} props
 * @param {Object|Function} props.Icon - Icon component to be rendered
 * @param {Object|string} props.iconProps - Icon config as an Object or Icon name as a string
 * @param {Object} props.styles - Custom styles for the component
 * @param {Object} props.toggled - Current toggled state of the Icon component
 *
 */
export const ListHeaderIcon = ({ Icon, iconProps, styles, toggled }) => {
  const theme = useTheme()
  const builtProps = useIconProps(iconProps, theme)
  const { animation } = useToggleAnimate({ toggled, ...toggleConfig })
  const transformStyle = useTransformStyle(animation)

  return (
    <Animated.View 
      style={[
        styles?.icon?.animate,
        transformStyle
      ]}
    >
      <Icon
        className='list-header-icon'
        { ...builtProps }
        styles={ styles }
      />
    </Animated.View>
  )
}
