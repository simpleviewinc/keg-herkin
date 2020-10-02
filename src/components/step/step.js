import React from 'react'
import { And } from './and'
import { Given } from './given'
import { When } from './when'
import { Then } from './then'

const stepTypes = {
  and: And,
  given: Given,
  when: When,
  then: Then,
}

export const Step = props => {
  const { step } = props
  const StepComp = stepTypes[step.type]

  return (<StepComp step={step} />)
}