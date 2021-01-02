import { definition } from './definition'
import { selectDefinition } from './selectDefinition'
import { selectType } from './selectType'

export const definitions = theme => ({
  definition: definition(theme),
  selectType: selectType(theme),
  select: selectDefinition(theme),
})