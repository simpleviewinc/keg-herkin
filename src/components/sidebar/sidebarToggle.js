import { useToggledStyles } from 'SVHooks/useToggledStyles'
import { Touchable, Text, View } from 'SVComponents'
import { ChevronDown } from 'SVAssets'
import { useTheme, useThemeHover } from '@keg-hub/re-theme'
import React from 'react'

const ToggleContent = props => {
  const { text, styles, toggled, onPress } = props
  const iconStyles = { transform: toggled ? 'rotate(90deg)' : 'rotate(270deg)' }
  const [ ref, themeStyles ] = useThemeHover(styles, styles?.hover)
  const iconSize = themeStyles?.icon?.fontSize || 20
  const iconStroke = themeStyles?.icon?.c || themeStyles?.icon?.color

  return (
    <Touchable
      touchRef={ref}
      className={`sidebar-toggle-action`}
      onPress={onPress}
      style={styles?.action}
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

export const SidebarToggle = ({ onPress, toggled, styles, text, children }) => {
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
          styles={toggleStyles}
          onPress={onPress}
        />
      )}
    </View>
  )
}

