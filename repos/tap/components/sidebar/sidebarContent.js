import React from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants'
import { FileTreePanel } from 'SVComponents/sidebar/content'

const { CATEGORIES, SIDEBAR_TYPES } = Values

/**
 * Manages the content displayed in the sidebar
 * @param {Object} props
 */
export const SidebarContent = (props) => {
  const { activeId } = useStoreItems(CATEGORIES.SIDEBAR) || {}

  switch (activeId) {
    case SIDEBAR_TYPES.FILE_TREE:
      return <FileTreePanel title={'TEST FILES'} {...props}/>  
    default:
      return null
  }

}