import React, { useState, useCallback } from 'react'
import { CaretDown } from 'SVAssets/icons'
import { noOpObj } from '@keg-hub/jsutils'
import { Icon, Touchable, Drawer, Text, View } from '@keg-hub/keg-components'
import { useThemeHover, useStyle } from '@keg-hub/re-theme'
import { reStyle } from '@keg-hub/re-theme/reStyle'

const MetaLabel = reStyle(Text)(theme => ({
  fontSize: 12,
  fontWeight: 'bold',
  paddingBottom: 5,
  color: theme.tapColors.default,
}))

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