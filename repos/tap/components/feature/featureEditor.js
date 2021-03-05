import { Surface } from 'SVComponents/surface'
import { useFeature } from 'SVHooks/useFeature'
import { noOp, noOpObj } from '@keg-hub/jsutils'
import { AceEditor } from 'SVComponents/aceEditor'
import React, { useCallback, useState } from 'react'
import { usePendingMark } from 'SVHooks/usePendingMark'


/**
 * Special editor for Feature Files using Gherkin styles syntax
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

  const surfaceTitle = usePendingMark(activeFile)
  
  return (
    <Surface
      prefix={'Editor'}
      hasToggle={false}
      capitalize={false}
      title={surfaceTitle}
      styles={{ main: props?.style }}
      className={`feature-surface-main`}
    >
      <AceEditor
        {...props}
        fileId={activeFile.location}
        mode='gherkin'
        onChange={onChange || onFeatureEdit}
      />
    </Surface>
  )
}
