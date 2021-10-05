import React, { useRef, useEffect } from 'react'
import { noOpObj } from '@keg-hub/jsutils'
import { useDomStyles } from 'SVHooks/useDomStyles'

/**
 * Calls useDomStyles hook with global styles and always returns null
 * @function
 * @param {Object} props
 * @param {Object} props.styles - Styles that should be added to the dom globally
 *
 */
const ApplyDomStyles = React.memo(({ styles }) => {
  useDomStyles(styles)
  return null
})

/**
 * Renders global css styles to the Dom via the useDomStyles hook
 * Splits call to useDomStyles into separate component to allow conditional call to hook
 * @function
 * @param {Object} props
 * @param {Object} props.styles - Styles that should be added to the dom globally
 *
 */
export const DomStyles = React.memo(({ styles=noOpObj }) => {
  const styleRef = useRef(false)
  useEffect(() => (styleRef.current = true))

  return !styleRef.current && (<ApplyDomStyles styles={styles} />)
})
