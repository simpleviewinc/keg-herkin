import React, { useState, useCallback } from 'react'
import { ChevronDown } from 'SVAssets/icons'
import { noOpObj } from '@keg-hub/jsutils'
import { Icon, Touchable } from '@keg-hub/keg-components'
import { useThemeHover } from '@keg-hub/re-theme'

export const MetaToggle = ({ toggled, styles=noOpObj, onPress }) => {
  const toggleStyles = styles.toggle
  const iconStyles = { transform: toggled ? 'rotate(0deg)' : 'rotate(-90deg)' }
  const [ ref, themeStyles ] = useThemeHover(toggleStyles, toggleStyles?.hover)

  return (
    <Touchable
      touchRef={ref}
      style={themeStyles.main}
      onPress={onPress}
    >
      <ChevronDown
        size={themeStyles?.icon?.fontSize || 12}
        style={[ themeStyles.icon, iconStyles ]}
        stroke={themeStyles?.icon?.c || themeStyles?.icon?.color}
      />
    </Touchable>
  )
}

export const DefinitionMeta = props => {

  return null
}