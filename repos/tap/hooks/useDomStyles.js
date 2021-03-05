import { useEffect } from 'react'
import { Values } from 'SVConstants'
import { useTheme } from '@keg-hub/re-theme'
import { createDomNode } from 'SVUtils/helpers/createDomNode'
import { useStyleTag } from '@keg-hub/re-theme/styleInjector'

const { KEG_DOM_STYLES_ID } = Values

let DomStyleSheet
let overridesSet = false

export const useDomStyles = () => {
  if(overridesSet) return overridesSet
  overridesSet = true

  const theme = useTheme()
  DomStyleSheet = DomStyleSheet || document.head.querySelector(`#${KEG_DOM_STYLES_ID}`)

  DomStyleSheet &&
    Object.entries(theme.domStyles)
      .map(([ className, rules ]) => {
        const { classList, css } = useStyleTag(rules, className)
        const styles = css.all.replace(/^.*{/, '{')
        
        const styleRules = classList[0].endsWith('$')
          ? `${classList[0].replace(/\$/g, '')}${styles}`
          : `${classList[0]}${styles}`
        
        styleRules && DomStyleSheet?.sheet?.insertRule(`@media all {${styleRules}}`)
        // styleRules &&
        //   DomStyleSheet && 
        //   (DomStyleSheet.textContent = `${DomStyleSheet.textContent}\n${styleRules}`)
      })
}


/**
 * Helper to auto-add the ace editor style overrides
 */
;(()=> createDomNode(KEG_DOM_STYLES_ID, 'style', 'head'))()