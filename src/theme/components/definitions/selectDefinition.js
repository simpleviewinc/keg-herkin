import { sharedSelectInline } from '../shared/select'
import { tapColors } from '../../tapColors'

export const selectDefinition = {
  select: { ...sharedSelectInline },
  main: sharedSelectInline?.main,
  label: {
    color: tapColors.inactive,
  }
}