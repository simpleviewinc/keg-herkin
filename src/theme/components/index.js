import { aceEditor } from './aceEditor'
import { chip } from './chip'
import { definitions } from './definitions'
import { drawer } from './drawer'
import { features } from './features'
import { header } from './header'
import { list } from './list'
import { runner } from './runner'
import { scenarios } from './scenarios'
import { section } from './section'
import { sidebar } from './sidebar'
import { step } from './step'
import { surface } from './surface'
import { tabbar } from './tabbar'
import { table } from './table'
import { tags } from './tags'

export const components = theme => ({
  aceEditor: aceEditor(theme),
  chip: chip(theme),
  definitions: definitions(theme),
  drawer: drawer(theme),
  features: features(theme),
  list: list(theme),
  runner: runner(theme),
  scenarios: scenarios(theme),
  section: section(theme),
  sidebar: sidebar(theme),
  tabbar: tabbar(theme),
  table: table(theme),
  tags: tags(theme),
  ...header(theme),
  ...step(theme),
  ...surface(theme),
})