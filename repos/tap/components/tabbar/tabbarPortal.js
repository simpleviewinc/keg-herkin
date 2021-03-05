import { Values } from 'SVConstants'
import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import { checkCall } from '@keg-hub/jsutils'
import { createDomNode } from 'SVUtils/helpers/createDomNode'

const { TABBAR_PORTAL_ID } = Values
let portalElement

export const TabbarPortal = ({ children }) => {
  return portalElement &&
    ReactDOM.createPortal(children, portalElement)
}

/**
 * Helper to auto-add dom portal element
 */
;(()=> portalElement = createDomNode(TABBAR_PORTAL_ID, 'div', 'body'))()


