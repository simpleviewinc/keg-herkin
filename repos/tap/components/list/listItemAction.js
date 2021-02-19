import React from 'react'
import { capitalize, noOpObj } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import { Icon, View, Touchable, Text } from 'SVComponents'

export const ListItemAction = props => {
  const {
    onPress,
    parentStyles=noOpObj,
    iconProps=noOpObj,
    name,
    showFeedback,
    styles=noOpObj
  } = props

  const mergedStyles = useStyle(parentStyles, styles)
  const iconStyles = useStyle(mergedStyles.icon, iconProps.styles)

  return (
    <View
      className='list-item-action-main'
      style={mergedStyles.main}
    >
      <Touchable
        onPress={onPress}
        showFeedback={showFeedback}
        style={mergedStyles.touchable}
        className={[ 'list-item-action', `list-item-action=${name}` ]}
      >
      {(iconProps) && (
        <Icon
          className='list-item-action-icon'
          {...iconProps}
          styles={iconStyles}
        />
      )}
      {name && (
        <Text
          className={'list-item-action-name'}
          style={mergedStyles.name}
        >
          { capitalize(name) }
        </Text>
      )}
      </Touchable>
    </View>
  )
  
}