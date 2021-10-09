import React from 'react'
import { Values } from 'SVConstants'

const { SCREENCAST_CANVAS } = Values

export const Canvas = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      tabIndex={0}
      id={SCREENCAST_CANVAS}
      {...props}
    />
  )
})