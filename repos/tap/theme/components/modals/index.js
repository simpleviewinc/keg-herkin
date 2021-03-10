import { testSelector } from './testSelector'
import { createFile } from './createFile'

export const modals = theme => ({
  createFile: createFile(theme),
  testSelector: testSelector(theme)
})