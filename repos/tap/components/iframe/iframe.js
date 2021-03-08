import { useStyle } from '@keg-hub/re-theme'
import React from 'react'

/**
 * Iframe
 * @param {Object} props
 * @param {string} src - url src to load into iframe
 */
export const Iframe = (props) => {
  const {
    src,
    style,
  } = props

  const mainStyles = useStyle(`iframe`, style)

  return (
    <iframe 
      {...props}
      style={mainStyles?.main} 
    />
  )
}