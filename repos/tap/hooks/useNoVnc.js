import { useState, useEffect } from 'react'
import { NoVncService } from 'SVServices/noVncService'

/**
 * Helper to initialize noVNC service 
 * @param {Object} element - Dom element to attach the canvas to
 * @param {string} vncUrl - Url to connect to the VNC websocket
 * @param {Object} creds - Credentials to connect to the VNC websocket
 *
 * @returns {Object} - Contains an instance of the NoVncService
 */
export const useNoVnc = (element, vncUrl, creds) => {
  const [noVnc, setNoVnc] = useState(null)
  useEffect(() => {
    setNoVnc(new NoVncService())
  }, [])

  useEffect(() => {
    noVnc &&
      element &&
      vncUrl &&
      noVnc.init(element, vncUrl, creds)

    return () => noVnc && noVnc.disconnect()
  }, [
    creds,
    noVnc,
    vncUrl,
    element,
  ])

  return { noVnc }
}
