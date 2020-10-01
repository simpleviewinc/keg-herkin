import React from 'react'
import { H2, H3, H4, H5, H6 } from '@keg-hub/keg-components'

const headers = { H2, H3, H4, H5, H6 }

export const Subheader = props => {
  const { Component, type='H4', children, style, className } = props
  const Header = Component || headers[type]
  
  return Header && children && (
    <Header className={className} style={style} >
      {children}
    </Header>
  ) || null
}