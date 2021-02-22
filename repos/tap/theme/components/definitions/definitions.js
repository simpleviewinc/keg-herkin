import { definition } from './definition'
import { selectDefinition } from './selectDefinition'
import { selectType } from './selectType'
import { definitionList } from './definitionList'
import { activeDefinitions } from './activeDefinitions'

export const definitions = theme => ({
  active: activeDefinitions(theme),
  definition: definition(theme),
  list: definitionList(theme),
  selectType: selectType(theme),
  select: selectDefinition(theme),
})