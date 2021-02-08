import React, { useCallback } from 'react'
import { useStyles } from 'SVHooks'
import { Cog } from 'SVAssets/icons'
import { setActiveModal } from 'SVActions/modals'
import { AppHeader, View, H5, Button } from 'SVComponents'
import { Values } from 'SVConstants'
const { MODAL_TYPES } = Values

const buildStyles = (theme, styles) => theme.get('appHeader', styles)

const ToggleSettings = ({ styles }) => {

  const onPress = useCallback(() => {
    setActiveModal(MODAL_TYPES.TEST_SELECTOR_MODAL)
  }, [])

  return (
    <View style={styles?.right?.main} >
      <Button
        styles={styles?.right?.button}
        onPress={onPress}
      >
        <Cog style={styles?.right?.icon} />
      </Button>
    </View>
  )
}

/**
 * Wraps the component with AppHeader
 *
 * @param {Object} title - title on the app header
 * @param {Object} Component - React component to be wrapped
 *
 * @returns {function} - wrapped functional component
 */
export const withAppHeader = (title, Component) => {
  const AppHeaderHoc = props => {
    const styles = useStyles(props.styles, props, buildStyles)
    return (
      <>
        <AppHeader
          styles={ styles.main }
          LeftComponent={(
            <View
              className='header-left-component'
              style={ styles.left.main }
            >
              <H5
                className='header-left-title'
                style={ styles.left.content.title }
              >
                { title }
              </H5>
            </View>
          )}
          RightComponent={(<ToggleSettings styles={styles} />)}
        />
        <Component {...props} />
      </>
    )
  }

  return AppHeaderHoc
}
