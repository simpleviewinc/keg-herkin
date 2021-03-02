import React, { useCallback, useState } from 'react'
import { AceEditor } from 'SVComponents/aceEditor'
import { useFeature } from 'SVHooks/useFeature'
import { noOp, noOpObj } from '@keg-hub/jsutils'
/**
 * 
 * @param {Object} props 
 * @param {Object} props.activeFile
 * @param {Object} props.onChange
 */
export const FeatureEditor = props => {
  const {
    activeFile=noOpObj,
    onChange=noOp
  } = props
  
  const { feature } = useFeature({ path: activeFile?.location }) || {}
  const [activeFeat, setActiveFeat] = useState(feature)

  const onFeatureEdit = useCallback((content) => {
    content !== feature.content &&
      !content.trim() &&
      setFeature({ ...feature, content })
      
  }, [activeFeat, setActiveFeat])

  return (
    <AceEditor
      {...props}
      mode='gherkin'
      onChange={onChange || onFeatureEdit}
    />
  )
}
