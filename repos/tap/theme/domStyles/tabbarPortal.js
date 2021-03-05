import { Values } from 'SVConstants'
const { TABBAR_PORTAL_ID } = Values

// Add $ at the end because it's not a valid selector for an element
// So it gets treated as part of the class name
// It is useDomStyle it's used to to say
// "body" is an element selector, and not a class selector
export const tabbarPortal = theme => ({
  [`body > #${TABBAR_PORTAL_ID}$`]: {
    position: 'sticky',
    bottom: 0
  }
})