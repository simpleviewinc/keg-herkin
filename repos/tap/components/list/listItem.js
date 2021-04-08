import React, { useCallback, useMemo } from 'react'
import { isStr, checkCall, isFunc, noOpObj, noPropArr } from '@keg-hub/jsutils'
import { Icon, View, Row, Text, Touchable } from 'SVComponents'
import { renderCustomOrDefault } from 'SVUtils'
import { useThemeHover, useStyle } from '@keg-hub/re-theme'
import { ListItemAction } from './listItemAction'

const RenderActions = ({ actions=noPropArr, styles=noOpObj, ...props }) => {
  return actions && (
    <View
      className='list-item-actions'
      style={ styles.main }
      >
      { actions.map(action => action && (
        <ListItemAction
          key={ action.name || action.title }
          parentStyles={styles.action}
          { ...props }
          { ...action }
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
      {title}
    </Text>
  ) || null
}

export const ListItem = React.memo(props => {
  const {
    active,
    actions,
    avatar,
    children,
    components=noOpObj,
    icon,
    onItemPress,
    renderItem,
    showFeedback,
    styles=noOpObj,
    title,
    uuid,
  } = props

  const mergeStyles = useStyle('list.item', styles)
  const activeStyle = active ? mergeStyles.active : noOpObj
  const [ rowRef, itemStyles ] = useThemeHover(mergeStyles.default, mergeStyles.hover)
  const rowStyles = useStyle(itemStyles.row, activeStyle?.row)

  const onPress = useCallback(
    event => checkCall(onItemPress, event, { title, active, uuid }),
    [title, active, uuid, onItemPress]
  )

  return (
    <Touchable
      showFeedback={showFeedback || true}
      className='list-item'
      touchRef={ rowRef }
      style={[itemStyles.main, activeStyle?.main]}
      onPress={onPress}
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
})


ListItem.Avatar = RenderAvatar
ListItem.Icon = RenderIcon
ListItem.Title = RenderTitle
ListItem.Actions = RenderActions