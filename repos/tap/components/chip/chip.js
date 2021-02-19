import React from 'react'
import { Icon, Text, Touchable } from 'SVComponents'
import { renderCustomOrDefault } from 'SVUtils'
import { isStr } from '@keg-hub/jsutils'
import { useThemeHover, useStyle } from '@keg-hub/re-theme'
import { noOpObj } from 'SVUtils/helpers/noop'

const RenderIcon = ({ icon, style, ...props }) => {
  icon = isStr(icon) ? { name: icon } : icon
  return icon && (
    <Icon
      className='chip-icon'
      styles={ style }
      { ...props }
      { ...icon }
    />
  ) || null
}

const RenderText = ({ style, text, ...props }) => {
  return text && (
    <Text
      className='chip-text'
      style={ style }
      { ...props }
    >
      { text }
    </Text>
  ) || null
}

export const Chip = props => {
  const {
    active,
    children,
    onPress,
    components=noOpObj,
    icon,
    styles=noOpObj,
    text,
  } = props

  const mergeStyles = useStyle('chip', styles)
  const activeStyle = active ? mergeStyles.active : noOpObj
  const [ chipRef, chipStyles ] = useThemeHover(mergeStyles.default, mergeStyles.hover)

  return (
      <Touchable
        className='chip'
        touchRef={ chipRef }
        style={[chipStyles?.main, activeStyle?.main]}
        onPress={onPress}
      >
      { children || ([
        icon && renderCustomOrDefault(
          components.icon,
          RenderIcon,
          { key: 'chip-icon', icon, style: chipStyles?.icon }
        ),
        text && renderCustomOrDefault(
          components.text,
          RenderText,
          { key: 'chip-text', text, style: chipStyles?.text }
        ),
      ])}
      </Touchable>
  )
  
}