import React, { useMemo } from 'react'
import { H6, Row, Touchable } from 'SVComponents'
import { ListHeaderIcon } from './listHeaderIcon'
import { wordCaps, noOpObj } from '@keg-hub/jsutils'
import { useThemeHover, useStyle } from '@keg-hub/re-theme'

export const ListHeader = props => {
  const {
    first,
    onPress,
    styles,
    title,
    Icon,
    iconProps,
    toggled
  } = props

  const mergeStyles = useStyle('list.header', styles)
  const [ rowRef, listStyles ] = useThemeHover(mergeStyles.default, mergeStyles.hover)

  const toggledStyle = toggled ? mergeStyles.active : noOpObj
  const rowStyle = useStyle(listStyles.row, toggledStyle?.row)
  const titleStyle = useStyle(listStyles.title, toggledStyle?.title)
  const toggleStyle = useStyle(listStyles.toggle, toggledStyle?.toggle)

  const touchStyle = useStyle(
    listStyles?.main,
    toggledStyle?.main,
    first && listStyles?.first?.main,
    first && toggledStyle?.first?.main,
  )

  return (
    <Touchable
      touchRef={rowRef}
      onPress={onPress}
      style={touchStyle}
      className="list-header-main"
      activeOpacity={mergeStyles?.active?.main?.opacity}
    >
    <Row
      style={rowStyle}
      className="list-header-row"
    >
      <H6
        style={titleStyle}
        className="list-header-title"
      >
        {wordCaps(title)}
      </H6>
      { Icon && (
        <ListHeaderIcon
          Icon={Icon}
          toggled={toggled}
          styles={toggleStyle}
          iconProps={iconProps}
        />
      )}
    </Row>
  </Touchable>
  )
}