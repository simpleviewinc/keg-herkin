import React, { useEffect } from 'react'
import { useToggledStyles } from 'SVHooks/useToggledStyles'
import { Touchable, Text, View } from 'SVComponents'
import { ChevronDown } from 'SVAssets/icons'
import { useTheme, useThemeHover } from '@keg-hub/re-theme'

/**
 * Helper to listen for click events
 * @function
 * @private
 * <br/>Checks if the sidebar should be closed based on click location
 * @param {boolean} toggled - Is the sidebar toggled open
 * @param {function} setIsToggled - Toggle the state of the sidebar open or closed
 * @param {Object} event - Native dom event
 *
 * @returns {void}
 */
const onWindowClick = (toggled, setIsToggled, event) => {
  if(!toggled) return

  const sideBarEl = event.target.closest('.sidebar-main')
  !sideBarEl && setIsToggled(false)
}


const ToggleContent = props => {
  const { text, styles, toggled, onPress, setIsToggled } = props
  const iconStyles = { transform: toggled ? 'rotate(90deg)' : 'rotate(270deg)' }

  const [ ref, themeStyles ] = useThemeHover(styles, styles?.hover)

  const iconSize = themeStyles?.icon?.fontSize || 20
  const iconStroke = themeStyles?.icon?.c || themeStyles?.icon?.color

  useEffect(() => {
    const onClick = onWindowClick.bind(window, toggled, setIsToggled)
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [toggled, setIsToggled])

  return (
    <Touchable
      touchRef={ref}
      className={`sidebar-toggle-action`}
      onPress={onPress}
      style={themeStyles?.action}
    >
      <View
        className={`sidebar-toggle-content`}
        style={themeStyles?.content}
      >
      { !text ? (
        <ChevronDown
          size={iconSize}
          stroke={iconStroke}
          style={[ themeStyles.icon, iconStyles ]}
        />
      ) : (
        <Text
          className={`sidebar-toggle-text`}
          style={themeStyles?.text}
        >
          { text }
        </Text>
      )}

      </View>
    </Touchable>
  )
}

export const SidebarToggle = props => {
  const {
    onPress,
    toggled,
    styles,
    text,
    children,
    setIsToggled
  } = props

  const theme = useTheme()
  const toggleStyles = useToggledStyles(toggled, theme.get('sidebar.toggle', styles))

  return (
    <View
      className={`sidebar-toggle-main`}
      style={toggleStyles?.main}
    >
    {children || (
        <ToggleContent
          theme={theme}
          text={text}
          toggled={toggled}
          setIsToggled={setIsToggled}
          styles={toggleStyles}
          onPress={onPress}
        />
      )}
    </View>
  )
}

