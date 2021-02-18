import React from 'react'
import { get, noOpObj } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import { useClassList, H2, H3, H4, H5, H6, Text } from '@keg-hub/keg-components'

const headers = { h2: H2, h3: H3, h4: H4, h5: H5, h6: H6 }

export const Subheader = props => {
  const {
    title,
    prefix,
    children,
    type='h6',
    Component,
    styles=noOpObj,
    classNames=noOpObj,
  } = props

  const typeStyles = useStyle(`typography.${type}`)
  const headerStyles = useStyle( `subheader`, styles)
  const Header = Component || headers[type]

  return Header && children && (
    <Header
      className={useClassList(classNames.main,`subheader-main`)}
      style={headerStyles.main}
    >
      <Text
        className={useClassList(classNames.container, `subheader-container`)}
        style={[typeStyles, headerStyles.container]}
      >
        <Text
          className={useClassList(classNames.prefix, `subheader-prefix`)}
          style={[typeStyles, headerStyles.prefix]}
        >
          {prefix}
        </Text>
        <Text
          className={useClassList(classNames.title, `subheader-title`)}
          style={[typeStyles, headerStyles.title]}
        >
          {title}
        </Text>
      </Text>
      { children }
    </Header>
  ) || null
}