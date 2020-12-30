import { chip } from './chip'
import { features } from './features'
import { list } from './list'
import { section } from './section'
import { table } from './table'
import { sidebar } from './sidebar'
import { tags } from './tags'
import { aceEditor } from './aceEditor'
import { definitions } from './definitions'
import { drawer } from './drawer'
import { header } from './header'
import { scenarios } from './scenarios'
import { step } from './step'
import { surface } from './surface'
import { tabbar } from './tabbar'

export const components = theme => ({
  aceEditor: aceEditor(theme),
  chip: chip(theme),
  features: features(theme),
  ...header(theme),
  list: list(theme),
  section: section(theme),
  table: table(theme),
  sidebar: sidebar(theme),
  tags: tags(theme),
  drawer: drawer(theme),
  scenarios: scenarios(theme),
  ...step(theme),
  ...surface(theme),
  tabbar: tabbar(theme),

})