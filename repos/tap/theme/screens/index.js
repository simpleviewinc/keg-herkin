import { empty } from './empty'
import { editors } from './editors'
import { feature } from './feature'
import { parent } from './parent'
import { results } from './results'
import { screencast } from './screencast'


export const screens = theme => ({
  empty: empty(theme),
  editors: editors(theme),
  feature: feature(theme),
  parent: parent(theme),
  results: results(theme),
  screencast: screencast(theme),
})