import { Surface } from 'SVComponents/surface'
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

  const [activeFeat, setActiveFeat] = useState(activeFile)

  const onFeatureEdit = useCallback((content) => {
    content !== activeFeat.content &&
      !content.trim() &&
      setFeature({ ...activeFeat, content })
      
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
