import { editStep } from './editStep'
import { step as stepDef } from './step'

export const step = theme => ({
  editStep: editStep(theme),
  step: stepDef(theme)
})
