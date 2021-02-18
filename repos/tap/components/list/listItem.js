import React from 'react'
import { isStr, capitalize } from '@keg-hub/jsutils'
import { Icon, View, Row, Text, Touchable } from 'SVComponents'
import { renderCustomOrDefault } from 'SVUtils'
import { useThemeHover, useStyle } from '@keg-hub/re-theme'
import { ListItemAction } from './listItemAction'
import { noOpObj } from 'SVUtils/helpers/noop'


const RenderActions = ({ actions, styles, ...props }) => {
  const { actions:actionStyles } = styles

  return actions && (
    <View className='list-item-actions' style={ actionStyles.main } >
      { actions.map(action => action && (
        <ListItemAction
          key={ action.name }
          { ...props }
          { ...action }
          styles={ actionStyles.action }
        />
      ))}
    </View>
  ) || null
}

const RenderAvatar = ({ avatar, ...props }) => {
  return avatar && (
    <View className='list-item-avatar' {...props} >
      
    </View>
  ) || null
}

const RenderIcon = ({ icon, style, ...props }) => {
  icon = isStr(icon) ? { name: icon } : icon
  return icon && (
    <Icon
      className='list-item-icon'
      styles={ style }
      { ...props }
      { ...icon }
    />
  ) || null
}

const RenderTitle = ({ style, title, ...props }) => {
  return title && (
    <Text
      className='list-item-title'
      style={ style }
      { ...props }
    >
      { capitalize(title) }
    </Text>
  ) || null
}

export const ListItem = props => {
  const {
    active,
    actions,
    avatar,
    children,
    components=noOpObj,
    icon,
    onItemPress,
    styles=noOpObj,
    title,
  } = props

  const mergeStyles = useStyle('list.item', styles)
  const activeStyle = active ? mergeStyles.active : noOpObj
  const [ rowRef, itemStyles ] = useThemeHover(mergeStyles.default, mergeStyles.hover)
  const rowStyles = useStyle(itemStyles.row, activeStyle?.row)

  return (
      <Touchable
        className='list-item'
        touchRef={ rowRef }
        style={[itemStyles.main, activeStyle?.main]}
        onPress={onItemPress}
      >
      <Row
        className='list-item-row'
        style={rowStyles}
      >
        { children || ([
          avatar && renderCustomOrDefault(
            components.avatar,
            RenderAvatar,
            { key: 'list-item-avatar', avatar, style: itemStyles.avatar },
          ),
          icon && renderCustomOrDefault(
            components.icon,
            RenderIcon,
            { key: 'list-item-icon', icon, style: itemStyles.icon }
          ),
          title && renderCustomOrDefault(
            components.title,
            RenderTitle,
            { key: 'list-item-title', title, style: [ itemStyles.title, activeStyle?.title ] }
          ),
          actions && renderCustomOrDefault(
            components.actions,
            RenderActions,
            { key: 'list-item-actions', actions, styles: itemStyles.actions }
          )
        ])}
      </Row>
    </Touchable>
  )
}
