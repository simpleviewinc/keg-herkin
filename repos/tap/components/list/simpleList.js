import React,  { useState, useCallback } from 'react'
import { useStyles } from 'SVHooks'
import { checkCall } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import {
  Grid,
  ListHeader,
  ListItem,
  Drawer,
} from 'SVComponents'

const buildStyles = (theme, styles={}) => {
  return {
    main: {
      ...styles.main,
      ...theme.flex.column,
    },
    content: {
      header: {},
      drawer: {
        backgroundColor: theme?.tapColors?.backGround,
      },
      item: {}
    }
  }
}

// Need to add an Item Render method
// This will allow passing in the render method for each item
// That We can define the ListItem separately and make this component reusable
// Should do the same for ListHeader
const RenderListItems = ({ items, group, onItemPress }) => {

  const itemPress = item => event => checkCall(onItemPress, event, item)
  
  return Object.entries(items)
    .map(([ key, meta ]) => {
      return (
          <ListItem
            key={`${group}-${key}`}
            title={ key }
            onItemPress={ itemPress(meta) }
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
    items,
    onHeaderPress,
    onItemPress,
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
      onItemPress={ onItemPress }
      listStyles={ styles?.content?.item }
    />
  )

  return (
    <>
      { header && (
        <ListHeader
          toggled={ toggled }
          onPress={ onTogglePress }
          title={ group }
          styles={styles?.content?.header }
        />
      )}
      { header && drawer
        ? (
            <Drawer
              {...drawerProps}
              className='sub-items-drawer'
              styles={ styles?.content?.drawer }
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
  
  const theme = useTheme()
  const listStyles = useStyles(styles, props, buildStyles)

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