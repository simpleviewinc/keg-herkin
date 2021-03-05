import { body } from './body'
import { tabbarPortal } from './tabbarPortal'
import { aceThemeOverrides } from './aceThemeOverrides'

export const domStyles = theme => ({
  ...body(theme),
  ...tabbarPortal(theme),
  ...aceThemeOverrides(theme),
})