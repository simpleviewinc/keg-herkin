import { sharedSelectInline } from '../shared/select'


export const selectDefinition = {
  select: { ...sharedSelectInline },
  main: sharedSelectInline?.main,
  label: {}
}