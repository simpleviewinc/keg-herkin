import React from 'react'
import { AppHeader, View, H5 } from 'SVComponents'
import { useStyles } from 'SVHooks'

const buildStyles = (theme, styles) => theme.get('appHeader', styles)

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
        />
        <Component {...props} />
      </>
    )
  }

  return AppHeaderHoc
}
