import React, { useState, useLayoutEffect } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { isFunc } from '@keg-hub/jsutils'
import { noOpObj } from 'SVUtils'

const callBuildStyles = (buildStyles, theme, styles=noOpObj, props) => {
  return isFunc(buildStyles) && buildStyles(theme, styles, props)
}

export const useStyles = (styles, props, buildStyles) => {
  const theme = useTheme()
  const [ builtStyles, setBuiltStyles  ] = useState(null)
  
  useLayoutEffect(() => {
    styles && 
      buildStyles && 
      setBuiltStyles(callBuildStyles(buildStyles, theme, styles, props))

  }, [ theme, styles, buildStyles ])

  return builtStyles || callBuildStyles(buildStyles, theme, styles, props)

}