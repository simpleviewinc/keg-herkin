import React from 'react'
import { Chip } from '../chip'

export const Tag = ({ tag, removeTag, ...props }) => {
  return (
    <Chip
      {...props}
      text={tag}
      onPress={removeTag}
    />
  )
}