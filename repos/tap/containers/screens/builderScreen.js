import React from 'react'
import { Feature, H5, View, Section } from 'SVComponents'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { EmptyScreen } from './emptyScreen'

/**
 * BuilderScreen - Renders Feature File NO-Code Editor
 * Only displays when a Feature file is selected as active from the side panel! 
 * @param {Object} props
 * @param {String} props.id - Id of the Builder screen
 * @param {Object} props.styles - Custom override styles for the Builder
 * @param {Object} props.title - Display name for the screen
 *
 */
export const BuilderScreen = props => {
  const activeFile = useActiveFile(props.id)

  return !activeFile || activeFile.fileType !== 'feature'
    ? (<EmptyScreen message={'Feature file not selected!'} />)
    : (<Feature feature={activeFile} />)
}