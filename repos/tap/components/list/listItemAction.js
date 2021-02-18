import React from 'react'
import { capitalize, noOpObj } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import { TouchableIcon, View, Touchable, Text } from 'SVComponents'

export const ListItemAction = props => {
  const { action, actionStyles=noOpObj, Icon, name, styles=noOpObj, size } = props
  const mergedStyles = useStyle(actionStyles, styles)
  
  return (
    <View
      className='list-item-action-wrapper'
      style={mergedStyles.main}
    >
      { Icon
        ? (
            <TouchableIcon
              Component={Icon}
              className='list-item-action-icon'
              onPress={action}
              styles={mergedStyles.icon}
              size={size}
            />
          )
        : (
            <Touchable
              className={[ 'list-item-action', `list-item-action=${name}` ]}
              onPress={action}
              style={mergedStyles.touchable}
            >
              <Text
                className={'list-item-action-name'}
                style={mergedStyles.name}
              >
                { capitalize(name) }
              </Text>
            </Touchable>
          )
      }
    </View>
  )
  
}