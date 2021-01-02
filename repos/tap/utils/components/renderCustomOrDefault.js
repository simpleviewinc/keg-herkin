import React from 'react'
import { isValidComponent } from '../validate/isValidComponent'

export const renderCustomOrDefault = (Component, DefComponent, props) => {
  return isValidComponent(Component)
    ? (<Component { ...props } />)
    : (<DefComponent { ...props } />)
}
