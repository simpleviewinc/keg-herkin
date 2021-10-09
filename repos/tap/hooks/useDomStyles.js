import { useMemo } from 'react'
import { Values } from 'SVConstants'
import { useStyle } from '@keg-hub/re-theme'
import { noOpObj } from '@keg-hub/jsutils'
import { createDomNode } from 'SVUtils/helpers/createDomNode'
import { convertToCss } from '@keg-hub/re-theme/styleInjector'

let DomStyleSheet
let stylesAdded = false
const { KEG_DOM_STYLES_ID } = Values
const isProduction = process.env.NODE_ENV === 'production'

/**
 * Helper hook to added CSS styles to a Stylesheet on the dom
 * Uses convertToCss helper from re-theme in a no-standard fashion
 * @type function
 *
 * @returns {void}
 */
export const useDomStyles = (styles=noOpObj) => {
  const globalStyles = useStyle('global', `domStyles`, styles)

  return useMemo(() => {
    if(stylesAdded) return stylesAdded
    stylesAdded = true

    DomStyleSheet = DomStyleSheet || document.head.querySelector(`#${KEG_DOM_STYLES_ID}`)

    DomStyleSheet &&
      Object.entries(globalStyles)
        .map(([ className, rules ]) => {
          const { blocks } = convertToCss(rules, noOpObj)
          // Blocks should always be an array with max length of 1
          // So we can treat it as a string here
          const validCssStr = blocks.length && `${className}${blocks}`

          validCssStr && (
            isProduction
              ? DomStyleSheet.sheet.insertRule(`@media all {${validCssStr}}`)
              : (DomStyleSheet.textContent = `${DomStyleSheet.textContent}\n${validCssStr}`)
          )
        })
  }, [])

}


/**
 * Helper to auto-add the ace editor style overrides
 */
;(()=> createDomNode(KEG_DOM_STYLES_ID, 'style', 'head'))()