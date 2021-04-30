import { testSelector } from './testSelector'
import { createFile } from './createFile'
import { testRunSettings } from './testRunSettings'

export const modals = theme => ({
  createFile: createFile(theme),
  testSelector: testSelector(theme),
  testRunSettings: testRunSettings(theme),
})