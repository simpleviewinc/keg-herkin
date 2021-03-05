import React from 'react'
import { useDomStyles } from 'SVHooks/useDomStyles'
import { checkCall } from '@keg-hub/jsutils'

let __STYLES_SET = false

const ApplyDomStyles = () => {
  useDomStyles()
  return null
}

export const DomStyles = () => {
  if(__STYLES_SET) return null
  __STYLES_SET = true

  return (<ApplyDomStyles />)
}
