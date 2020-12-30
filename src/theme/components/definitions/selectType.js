import { tapColors } from '../../tapColors'
import { sharedSelect } from '../shared'

export const selectType = theme => sharedSelect(theme, {
  select: {
    $all: {
      c: tapColors.default,
      ftWt: 'bold',
    }
  }
})