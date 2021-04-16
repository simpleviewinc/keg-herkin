import React, { useState, useCallback } from 'react'
import { CaretDown } from 'SVAssets/icons'
import { noOpObj } from '@keg-hub/jsutils'
import { Icon, Touchable, Drawer, Text, View } from '@keg-hub/keg-components'
import { useThemeHover, useStyle } from '@keg-hub/re-theme'
import { reStyle } from '@keg-hub/re-theme/reStyle'

/**
 * MetaLabel - React component using ReStyle for custom styles
 * @type {Object}
 */
const MetaLabel = reStyle(Text)(theme => ({
  fontSize: 12,
  fontWeight: 'bold',
  paddingBottom: 2,
  color: theme.tapColors.default,
}))

/**
 * MetaToggle - Toggles a definitions meta-data section open and closed 
 * @param {Object} props
 * @param {Object} props.styles - Custom styles for displaying the component
 * @param {Object} props.metaStyles - Custom styles object overrides the style prop
 * @param {boolean} props.toggled - Current toggled state
 * @param {function} props.onPress - Method called when the toggle is pressed
 *
 * @returns {Component}
 */
export const MetaToggle = props => {
  const { metaStyles=noOpObj, toggled, styles=noOpObj, onPress } = props

  const toggleStyles = useStyle(styles.toggle, metaStyles.toggle)
  const iconStyles = { transform: toggled ? 'rotate(0deg)' : 'rotate(-90deg)' }
  const [ ref, themeStyles ] = useThemeHover(toggleStyles, toggleStyles?.hover)

  return (
    <Touchable
      touchRef={ref}
      style={themeStyles.main}
      onPress={onPress}
    >
      <CaretDown
        size={themeStyles?.icon?.fontSize || 12}
        style={[ themeStyles.icon, iconStyles ]}
        stroke={themeStyles?.icon?.c || themeStyles?.icon?.color}
      />
    </Touchable>
  )
}

/**
 * MetaExpression - Displays the description key from a definitions the meta data
 * @param {Object} props
 * @param {Object} props.meta - Meta-data from a definition
 * @param {Object} props.styles - Custom styles for displaying the component
 * @param {Object} props.expression - Metadata of an expression from a definitions match text 
 *
 * @returns {Component}
 */
const MetaDescription = ({ meta, styles }) => {
  return (meta.description && (
    <View>
      <MetaLabel className={'def-meta-description-label'} >
        Description
      </MetaLabel>
      <Text
        className={'def-meta-description'}
        style={styles.description}
      >
        {meta.description}
      </Text>
    </View>
  ))
}

/**
 * MetaExpression - Displays the info of an expression from a definitions the meta data
 * @param {Object} props
 * @param {Object} props.meta - Meta-data from a definition
 * @param {Object} props.styles - Custom styles for displaying the component
 * @param {Object} props.expression - Metadata of an expression from a definitions match text 
 *
 * @returns {Component}
 */
const MetaExpression = ({ meta, expression, styles=noOpObj }) => {
  const start = "{"
  const end = "}"
  return (
    <View
      className={'def-meta-expressions'}
      style={styles.main}
    >
      <Text
        style={styles.info}
      >
        {start}{expression.type}{end} - {expression.description}
      </Text>
    </View>
  )
}

/**
 * DefinitionMeta - Displays the meta-data of a Step Definition
 * @param {Object} props
 * @param {Object} props.styles - Custom styles for displaying the component
 * @param {Object} props.metaStyles - Custom styles object overrides the style prop
 * @param {boolean} props.toggled - Current toggled state
 * @param {Object} props.meta - Meta-data from the step definition
 *
 * @returns {Component}
 */
export const DefinitionMeta = props => {
  const { metaStyles=noOpObj, styles=noOpObj, toggled, meta=noOpObj } = props
  const drawerStyles = useStyle(styles.drawer, metaStyles.drawer)

  return (
    <Drawer
      className={'def-meta-drawer'}
      styles={drawerStyles}
      toggled={toggled}
    >
      <MetaDescription meta={meta} styles={drawerStyles} />
      <View
        className={'def-meta-expressions'}
        style={drawerStyles.expressions}
      >
        <MetaLabel
          className={'def-meta-expressions-label'}
          style={{ marginTop: 10 }}
        >
          Expressions
        </MetaLabel>
        {meta.expressions && meta.expressions.map(expression => {
          return (
            <MetaExpression
              meta={meta}
              expression={expression}
              styles={drawerStyles.expression}
              key={`${expression.key}-${expression.description}`}
            />
          )
        })}
      </View>
    </Drawer>

  )
}