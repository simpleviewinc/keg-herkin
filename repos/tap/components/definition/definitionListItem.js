import React, { useCallback, useMemo, useState } from 'react'
import { isStr, checkCall, noOpObj, isEmptyColl } from '@keg-hub/jsutils'
import { Icon, View, Row, Text, Touchable } from 'SVComponents'
import { renderCustomOrDefault } from 'SVUtils'
import { useThemeHover, useStyle } from '@keg-hub/re-theme'
import { ListItem } from '../list/listItem'
import { ChevronDown } from 'SVAssets/icons'
import { MetaToggle, DefinitionMeta } from './definitionMeta'
const { Actions, Title } = ListItem


export const DefinitionListItem = React.memo(props => {
  const {
    active,
    actions,
    children,
    components=noOpObj,
    group,
    meta,
    onItemPress,
    renderItem,
    styles=noOpObj,
    title,
    uuid,
  } = props

  const hasMetaData = !isEmptyColl(meta)
  const mergeStyles = useStyle('list.item', 'definitions.list.list.item')

  const activeStyle = active ? mergeStyles.active : noOpObj
  const [ rowRef, itemStyles ] = useThemeHover(mergeStyles.default, mergeStyles.hover)
  const rowStyles = useStyle(itemStyles.row, activeStyle?.row)

  const onPress = useCallback(
    event => checkCall(onItemPress, event, { title, active, uuid }),
    [title, active, uuid, onItemPress]
  )

  const [metaToggled, setMetaToggled] = useState(false)
  const metaStyles = !hasMetaData
    ? mergeStyles.noMeta
    : metaToggled
      ? mergeStyles.activeMeta
      : noOpObj


  const toggleMeta = useCallback(
    () => setMetaToggled(!metaToggled),
    [metaToggled, setMetaToggled]
  )

  return (
    <Row
      key={`${group}-${title}`}
      className='list-item-row'
      style={rowStyles}
    >
      <View
        className={`def-list-image-main`}
        ref={rowRef}
        style={[
          itemStyles.main,
          activeStyle?.main,
          metaStyles.main,
        ]}
      >
        <Touchable
          style={itemStyles.touchable}
          showFeedback={true}
          className='definition-list-item'
          onPress={toggleMeta}
        >
          {hasMetaData && (
            <MetaToggle
              styles={itemStyles.meta}
              metaStyles={metaStyles.meta}
              onPress={toggleMeta}
              toggled={metaToggled}
            />
          )}
          <Title
            title={title}
            style={[
              itemStyles.title,
              activeStyle?.title,
              metaStyles.title,
            ]}
          />
        </Touchable>
        <Actions
          actions={actions}
          onPress={onPress}
          styles={itemStyles.actions}
        />
      </View>
      {hasMetaData && (
        <DefinitionMeta
          meta={meta}
          group={group}
          title={title}
          styles={itemStyles.meta}
          metaStyles={metaStyles.meta}
          toggled={metaToggled}
          setMetaToggled={setMetaToggled}
        />
      )}
    </Row>
  )
})
