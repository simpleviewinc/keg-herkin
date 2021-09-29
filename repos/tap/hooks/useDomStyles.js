import { Values } from 'SVConstants'
import { useTheme } from '@keg-hub/re-theme'
import { createDomNode } from 'SVUtils/helpers/createDomNode'
import { useStyleTag } from '@keg-hub/re-theme/styleInjector'

const { KEG_DOM_STYLES_ID } = Values

let DomStyleSheet
let overridesSet = false

/**
 * Helper hook to added CSS styles to a Stylesheet on the dom
 * Uses helpers from re-theme in a no-standard fashion
 * @type function
 *
 * @returns {void}
 */
export const useDomStyles = () => {
  if(overridesSet) return overridesSet
  overridesSet = true

  const theme = useTheme()
  DomStyleSheet = DomStyleSheet || document.head.querySelector(`#${KEG_DOM_STYLES_ID}`)

  DomStyleSheet &&
    Object.entries(theme.domStyles)
      .map(([ className, rules ]) => {
        const { classNames, css } = useStyleTag(rules, className)
        const styles = css.all.replace(/^.*{/, '{')

        const classList = classNames.split(' ')
        
        const styleRules = classNames.endsWith('$')
          ? `${classNames.replace(/\$/g, '')}${styles}`
          : `${classNames}${styles}`
        
        styleRules && DomStyleSheet?.sheet?.insertRule(`@media all {${styleRules}}`)
      })
}


/**
 * Helper to auto-add the ace editor style overrides
 */
;(()=> createDomNode(KEG_DOM_STYLES_ID, 'style', 'head'))()