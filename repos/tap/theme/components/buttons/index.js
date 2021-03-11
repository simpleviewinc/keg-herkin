import { runTests } from './runTests'
import { saveFile } from './saveFile'

export const buttons = theme => {
  const runStyles = runTests(theme)

  return {
    runTests: runStyles,
    saveFile: saveFile(theme, runStyles),
  }

}