import { sharedSelectInline } from '../shared/select'
import { tapColors } from '../../tapColors'

export const selectDefinition = theme => {
  const shared = sharedSelectInline(theme)
  return {
    select: { ...shared },
    main: shared?.main,
    label: {
      color: tapColors.inactive,
    }
  }
}