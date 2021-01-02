import React, { useMemo } from 'react'
import { wordCaps, isStr } from '@keg-hub/jsutils'
import {
  H6,
  Icon,
  Row,
  Touchable,
  View,
} from 'SVComponents'
import { noOpObj } from 'SVUtils/helpers/noop'
import { useStyles, useToggleAnimate } from 'SVHooks'
import { useTheme, useThemeHover } from '@keg-hub/re-theme'
import { get } from '@keg-hub/jsutils'
import { Animated } from 'react-native'


const buildStyles = (theme, styles, props) => {
  return theme.get('list.header', styles)
}

const buildIconProps = (icon, theme) => {
  return {
    name: 'chevron-down',
    color: theme.colors.palette.gray01,
    size: 20,
    ...(icon ? isStr(icon) ? { name: icon } : icon : null)
  }
}

const HeaderIcon = ({ icon, styles, theme, toggled }) => {

  const iconProps = useMemo(
    () => buildIconProps(icon, theme),
    [ icon, theme ]
  )

  const { animation } = useToggleAnimate({
    toggled,
    values: { from: 0, to: 1 },
    config: { duration: 400 }
  })

  return (
    <Animated.View 
      className='list-header-icon'
      style={[
        get(styles, 'icon.animate'),
        {
          transform: [{
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '180deg']
            }) 
          }]
        }
      ]}
    >
      <Icon { ...iconProps } styles={ styles } />
    </Animated.View>
  )

}

export const ListHeader = props => {

  const { onPress, styles, title, icon, toggled } = props
  const theme = useTheme()
  const mergeStyles = useStyles(styles, props, buildStyles)
  
  const [ rowRef, listStyles ] = useThemeHover(mergeStyles.default, mergeStyles.hover)

  const activeStyle = toggled ? mergeStyles.active : noOpObj

  return (
    <Touchable
      className="list-header-main"
      activeOpacity={ get(mergeStyles, 'active.main.opacity') }
      touchRef={ rowRef }
      style={[listStyles.main, activeStyle?.main]}
      onPress={ onPress }
    >
    <Row
      style={theme.get(listStyles.row, activeStyle?.row)}
      className="list-header-row"
    >
      <H6
        style={[listStyles.title, activeStyle?.title]}
        className="list-header-title"
      >
        { wordCaps(title) }
      </H6>
      { icon && (
        <HeaderIcon
          icon={ icon }
          styles={[listStyles.toggle, activeStyle?.toggle]}
          theme={ theme }
          toggled={ toggled }
        />
      )}
    </Row>
  </Touchable>
  )
}