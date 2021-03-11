import { aceEditor } from './aceEditor'
import { buttons } from './buttons'
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
import { toast } from './toast'
import { table } from './table'
import { tags } from './tags'
import { modals } from './modals'
import { treeList } from './treeList'
import { cmdOutput } from './cmdOutput'
import { iframe } from './iframe'

export const components = theme => ({
  aceEditor: aceEditor(theme),
  buttons: buttons(theme),
  chip: chip(theme),
  cmdOutput: cmdOutput(theme),
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
  modals: modals(theme),
  treeList: treeList(theme),
  toast: toast(theme),
  iframe: iframe(theme),
  ...header(theme),
  ...step(theme),
  ...surface(theme),
})