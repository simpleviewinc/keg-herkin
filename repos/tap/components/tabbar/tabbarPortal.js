import React, { useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import { __PORTAL_NODE } from 'SVUtils/dom/portalElement'

export const TabbarPortal = ({ children, node }) => {
  useLayoutEffect(() => {
    return () => {
      if(node) return document.body.removeChild(node)

      while (__PORTAL_NODE.firstChild) {
        __PORTAL_NODE.firstChild.remove()
      }
    }
  }, [])

  return ReactDOM.createPortal(
    children,
    node || __PORTAL_NODE
  )

}



