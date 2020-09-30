import React from 'react'
import { Row, Text } from 'SVComponents'

export const Tag = ({ tag }) => {
  return (
    <Text>
      { `${ tag } ` }
    </Text>
  )
}