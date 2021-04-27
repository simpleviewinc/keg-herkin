import { useStyle } from '@keg-hub/re-theme'
import React from 'react'

/**
 * TODO: Create a new tab for viewing the browser in a iframe
 * Or Investigate some type of slide out that shows the iframe
 * src={`http://0.0.0.0:5005/novnc/vnc_lite.html?host=0.0.0.0&port=26367`}
*/

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
      src={`http://0.0.0.0:5005/novnc/vnc_lite.html?host=0.0.0.0&port=26367`}
      style={mainStyles?.main} 
    />
  )
}