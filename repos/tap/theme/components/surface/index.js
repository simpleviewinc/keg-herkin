import { surface as surfaceDef } from './surface'
import { subsurface } from './subsurface'

export const surface = theme => ({
  surface: surfaceDef(theme),
  subsurface: subsurface(theme),
})