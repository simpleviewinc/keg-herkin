import { tapColors } from '../../tapColors'
import { sharedSelect } from '../shared'

export const selectType = sharedSelect({
  select: {
    $all: {
      c: tapColors.default,
      ftWt: 'bold',
    }
  }
})