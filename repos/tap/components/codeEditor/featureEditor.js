import React from 'react'
import { AceEditor } from 'SVComponents/aceEditor'


export const FeatureEditor = props => {
  return (
    <AceEditor
      {...props}
      mode='gherkin'
    />
  )
}
