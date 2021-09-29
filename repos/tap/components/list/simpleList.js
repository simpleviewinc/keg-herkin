import React,  { useState, useCallback, useMemo, useEffect } from 'react'
import { useStyle } from '@keg-hub/re-theme'
import {
  checkCall,
  noPropArr,
  deepMerge,
  noOpObj,
  isFunc,
  exists
} from '@keg-hub/jsutils'
import { ListItem } from './listItem'
import { ListHeader } from './listHeader'
import { Grid, Drawer } from 'SVComponents'
import { renderFromType } from '@keg-hub/keg-components'

/**
 * Helper to build the toggled values and callbacks based on passed in props
 * @function
 *
 * @returns {Object} - Built toggle values and callbacks
 */
const useToggled = (meta, propsToggled, drawerToggled, onHeaderPress) => {

  // Get the toggle state if its controlled externally
  const controlledToggle = useMemo(() => {
    return exists(meta.toggled)
      ? meta.toggled
      : exists(drawerToggled)
        ? drawerToggled
        : exists(propsToggled)
          ? propsToggled
          : undefined
  }, [meta.toggled, drawerToggled, propsToggled])

  // Store the initial toggle state
  const [ toggled, setToggled ] = useState(exists(controlledToggle) ? controlledToggle : false)

  // Add a callback for toggling the state when header is pressed
  const onTogglePress = useCallback(event => {
      checkCall(onHeaderPress, event, meta)
      // If no controlledToggle exists, flip the toggled state 
      !exists(controlledToggle) && setToggled(!toggled)
  }, [ onHeaderPress, meta, toggled, controlledToggle ])

  // If the toggle state is controlled externally
  // Then validate if it's correct, and update the state if it's not
  // Unfortunately this must be done after the controlledToggle state is updated
  useEffect(() => {
    exists(controlledToggle) &&
      controlledToggle !== toggled &&
      setToggled(controlledToggle)
  }, [toggled, controlledToggle])

  return {
    onTogglePress,
    setToggled,
    toggled,
  }
  
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
        ? renderFromType(renderItem, itemProps)
        : (<ListItem {...itemProps} />)
    })
}

const RenderList = props => {
  const {
    drawer=true,
    first,
    header=true,
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

  const {
    toggled,
    onTogglePress,
    setToggled,
  } = useToggled(
    meta,
    props.toggled,
    drawerProps[groupKey]?.toggled,
    onHeaderPress
  )

  const drawerStyles = useStyle(
    styles?.drawer,
    drawerProps?.styles,
    toggled && styles?.drawer?.toggled,
    toggled && drawerProps?.styles?.toggled,
  )

  const RenderedItems = (
    <RenderListItems
      first={first}
      last={last}
      items={meta.items || noPropArr}
      group={group}
      renderItem={renderItem}
      onItemPress={onItemPress}
      styles={styles?.item}
    />
  )

  return (
    <>
      {header && (
        <ListHeader
          first={first}
          last={last}
          Icon={HeaderIcon}
          iconProps={iconProps}
          toggled={toggled}
          onPress={onTogglePress}
          title={group}
          styles={styles?.header}
        />
      )}
      {header && drawer
        ? (
            <Drawer
              {...drawerProps}
              first={first}
              last={last}
              className='sub-items-drawer'
              styles={drawerStyles}
              toggled={toggled}
            >
              {RenderedItems}
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
  const listStyles = useStyle(`list`, styles)
  const itemsLength = items.length - 1

  return Object.entries(items)
    .map(([ key, meta ], index) => {
      return (
        <Grid
          className="simple-list"
          key={`${meta.group}-${key}`}
          style={listStyles.main}
        >
          <RenderList
            { ...props }
            first={index === 0}
            last={itemsLength === index}
            index={index}
            groupKey={key}
            meta={meta}
            styles={listStyles}
          />
        </Grid>
      )
    })
}