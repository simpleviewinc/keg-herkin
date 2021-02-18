import React,  { useState, useCallback } from 'react'
import { useStyles } from 'SVHooks'
import { checkCall, noPropArr, deepMerge } from '@keg-hub/jsutils'
import { useStylesCallback } from '@keg-hub/re-theme'
import {
  Grid,
  ListHeader,
  ListItem,
  Drawer,
} from 'SVComponents'

const buildStyles = (theme, styles={}) => {
  return deepMerge({
    main: {
      ...theme.flex.column,
    },
    header: {},
    drawer: {
      backgroundColor: theme?.tapColors?.backGround,
    },
    item: {}
  }, styles)
}


const RenderListItems = ({ items, renderItem, group, onItemPress }) => {
  return Object.entries(items)
    .map(([ key, meta ]) => {
      return (
          <ListItem
            key={`${group}-${key}`}
            title={ key }
            renderItem={renderItem}
            onItemPress={onItemPress}
            item={meta}
            { ...meta }
          />
        )
    })
}

const RenderList = props => {
  const {
    drawer=true,
    group,
    header=true,
    HeaderIcon,
    iconProps,
    items,
    onHeaderPress,
    onItemPress,
    renderItem,
    styles,
    initialToggle,
    drawerProps
  } = props

  const [ toggled, setToggled ] = useState(initialToggle || false)

  const onTogglePress = useCallback(event => {
    checkCall(onHeaderPress, event)
    setToggled(!toggled)
  }, [ items, toggled, group, onHeaderPress ])

  const RenderedItems = (
    <RenderListItems
      items={ items }
      group={ group }
      renderItem={renderItem}
      onItemPress={ onItemPress }
      listStyles={ styles?.item }
    />
  )

  return (
    <>
      { header && (
        <ListHeader
          Icon={HeaderIcon}
          iconProps={iconProps}
          toggled={ toggled }
          onPress={ onTogglePress }
          title={ group }
          styles={styles?.header }
        />
      )}
      { header && drawer
        ? (
            <Drawer
              {...drawerProps}
              className='sub-items-drawer'
              styles={ styles?.drawer }
              toggled={ toggled }
            >
            { RenderedItems }
            </Drawer>
          )
        : RenderedItems
      }
    </>
  )

}

// Need to move tasks spacific data outside of this component
// Should create a RenderTasks component, and use this inside it
// Which will make this component reuseable
export const SimpleList = (props) => {
  const { items, styles, toggled } = props
  const listStyles = useStylesCallback(buildStyles, noPropArr, styles)

  return Object.entries(items)
    .map(([ key, meta ]) => {
      return (
        <Grid
          className="simple-list"
          key={`${meta.group}-${key}`}
          style={ listStyles.main }
        >
          <RenderList
            { ...props }
            group={ key }
            items={ meta.items }
            styles={ listStyles }
            initialToggle={ toggled }
          />
        </Grid>
      )
    })
}