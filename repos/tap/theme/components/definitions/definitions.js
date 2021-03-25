import { reload } from './reload'
import { definition } from './definition'
import { selectType } from './selectType'
import { definitionList } from './definitionList'
import { selectDefinition } from './selectDefinition'
import { activeDefinitions } from './activeDefinitions'

export const definitions = theme => ({
  active: activeDefinitions(theme),
  definition: definition(theme),
  list: definitionList(theme),
  reload: reload(theme),
  selectType: selectType(theme),
  select: selectDefinition(theme),
})