import { empty } from './empty'
import { editors } from './editors'
import { feature } from './feature'
import { parent } from './parent'

export const screens = theme => ({
  empty: empty(theme),
  editors: editors(theme),
  feature: feature(theme),
  parent: parent(theme),
})