import React,  { useState, useCallback, useMemo } from 'react'
import { useStyles } from 'SVHooks'
import { useStylesCallback } from '@keg-hub/re-theme'
import {
  checkCall,
  noPropArr,
  deepMerge,
  noOpObj,
  isFunc
} from '@keg-hub/jsutils'
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
    drawer: {
      content: {
        backgroundColor: theme?.tapColors?.backGround,
      },
    },
  }, styles)
}


const RenderListItems = ({ items, renderItem, group, onItemPress, styles }) => {
  return Object.entries(items)
    .map(([ key, item ]) => {
      const itemProps = {
        group,
        styles,
        title: key,
        onItemPress,
        key: `${group}-${key}`,
        ...item
      }

      return isFunc(renderItem)
        ? renderItem(itemProps)
        : (<ListItem {...itemProps} />)
    })
}

const RenderList = props => {
  const {
    drawer=true,
    first,
    header=true,
    headerToggle=true,
    groupKey,
    HeaderIcon,
    iconProps,
    last,
    meta=noOpObj,
    onHeaderPress,
    onItemPress,
    renderItem,
    styles,
    drawerProps=noOpObj
  } = props

  const group = meta.group || groupKey
  const toggled = meta.toggled || drawerProps[groupKey]?.toggled || props.toggled || false
  const [ headerToggled, setToggled ] = useState(toggled)

  const onTogglePress = useCallback(event => {
    checkCall(onHeaderPress, event, meta)
    headerToggle && setToggled(!headerToggled)
  }, [ toggled, onHeaderPress, meta, headerToggled, headerToggle ])

  const drawerStyles = useMemo(() => {
    return deepMerge(
      {},
      styles?.drawer,
      drawerProps?.styles,
      toggled && styles?.drawer?.toggled,
      toggled && drawerProps?.styles?.toggled,
    )
  }, [styles?.drawer, drawerProps.styles, toggled])

  const RenderedItems = (
    <RenderListItems
      first={first}
      last={last}
      items={ meta.items || noPropArr }
      group={ group }
      renderItem={renderItem}
      onItemPress={ onItemPress }
      styles={ styles?.item }
    />
  )

  return (
    <>
      { header && (
        <ListHeader
          first={first}
          last={last}
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
              first={first}
              last={last}
              className='sub-items-drawer'
              styles={ drawerStyles }
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

// Need to move tasks specific data outside of this component
// Should create a RenderTasks component, and use this inside it
// Which will make this component reuseable
export const SimpleList = (props) => {
  const { items, styles } = props
  const listStyles = useStylesCallback(buildStyles, noPropArr, styles)
  const itemsLength = items.length - 1

  return Object.entries(items)
    .map(([ key, meta ], index) => {
      return (
        <Grid
          className="simple-list"
          key={`${meta.group}-${key}`}
          style={ listStyles.main }
        >
          <RenderList
            { ...props }
            first={index === 0}
            last={itemsLength === index}
            index={index}
            groupKey={key}
            meta={meta}
            styles={ listStyles }
          />
        </Grid>
      )
    })
}