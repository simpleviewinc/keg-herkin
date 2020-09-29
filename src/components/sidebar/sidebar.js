import React from 'react'
import { View } from 'SVComponents'


export const Sidebar = props => {
  const {
    children,
    style
  } = props


  return (
    <View 
      className='sidebar-main'
      style={style}
    >
      { children }
    </View>
  )
}