import React, { useEffect } from 'react'
import { useStyleTag } from '@keg-hub/re-theme/styleInjector'

let AceStyleOverrides
const styleSheetId = 'herkin-ace-styles'
let overridesSet = false

const getStyleSheet = () => {
  AceStyleOverrides =
    AceStyleOverrides || document.head.querySelector(styleSheetId)

  return AceStyleOverrides
}

const addToDom = (css) => {
  const styleSheet = getStyleSheet()
  styleSheet?.sheet?.insertRule(`@media all {${css}}`)
}

const useThemeOverrides = (theme, addOverrides) => {
  Object.entries(theme.aceThemeOverrides)
    .map(([ className, rules ]) => {
      const { classList, css } = useStyleTag(rules, className)
      const styles = css.all.replace(classList[1], classList[0])
      addOverrides && styles && addToDom(styles)
    })
}

export const ThemeOverrides = ({ addOverrides, setOverrides, theme }) => {
  useThemeOverrides(theme, addOverrides)
  useEffect(() => { setOverrides(false) })

  return null
}


/**
 * Helper to auto-add the ace editor style overrides
 */
;(()=> {
  AceStyleOverrides = document.head.querySelector(styleSheetId)
  AceStyleOverrides = AceStyleOverrides || document.createElement('style')
  AceStyleOverrides.id = styleSheetId

  document.head.append(AceStyleOverrides)
})()