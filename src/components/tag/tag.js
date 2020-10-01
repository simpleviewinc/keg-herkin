import React from 'react'
import { Text } from 'SVComponents'
import { Chip } from '../chip'

export const Tag = ({ tag, ...props }) => {
  return (<Chip {...props} text={tag} />)
}