import { exists } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import React, { useEffect, useState, useRef } from 'react'

/**
  * Ideally the following script is added to the page loaded in the iframe
  * Then we listen for the message here, and use it to set the height
```js
  <script>
    window.parent !== window &&
      window.parent.postMessage({ herkinIframeHeight: document.body.scrollHeight }, '*')
  </script>
```
  * TODO: update the backend API to inject the below script onto all html files 
  * This script has no effect if the page is not loaded into an iframe
  * So it's safe to add to all
 */

/**
 * Helper for getting the height for the iframe
 * Only used when the iframe does not send it height to us via post message
 * Double the page height for parent window and child iframe
 * Then add a buffer of 200 px
 * May not covert everything, but se rely on post message to set the real height
 * @function
 *
 * @return {string} - Initial height to use from the iframe
 */
const getWindowHeight = () => {
  return `${(document.body.scrollHeight * 2) + 200}px`
}

/**
 * TODO: Create a new tab for viewing the browser in a iframe
 * Or Investigate some type of slide out that shows the iframe
 * src={`http://0.0.0.0:5005/novnc/vnc_lite.html?host=0.0.0.0&port=26367`}
*/

/**
 * Iframe
 * @param {Object} props
 * @param {string} props.src - url src to load into iframe
 * @param {object} props.styles - Styles for the iframe element
 */
export const Iframe = (props) => {
  const {
    src,
    styles,
  } = props

  const iframeHeight = useRef()
  const [frameStyle, setFrameStyle] = useState({ main: { height: getWindowHeight() }})

  useEffect(() => {
    // Event listener handler for post message events from the child iframe
    const onMessage = event => {
      iframeHeight.current = true
      const sentHeight = event.data.herkinIframeHeight
      exists(sentHeight) &&
        sentHeight !== frameStyle.main.height &&
        setFrameStyle({ main: { height: `${sentHeight}px` }})
    }

    // Add listener to the window
    window.addEventListener('message', onMessage)
    // If the ref is set, then just return
    if(iframeHeight.current) return
    
    // Get the current window height and save it to state
    const currentHeight = getWindowHeight()
    frameStyle.main.height !== currentHeight &&
      setFrameStyle({ main: { height: currentHeight }})
    
    // Remove the listener on unmount
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const mainStyles = useStyle(`iframe`, styles, frameStyle)
  return (
    <iframe 
      {...props}
      src={`http://0.0.0.0:5005/novnc/vnc_lite.html?host=0.0.0.0&port=26367`}
      style={mainStyles?.main} 
    />
  )
}