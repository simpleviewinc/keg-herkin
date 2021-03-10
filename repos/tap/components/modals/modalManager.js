import React from 'react'
import { Values } from 'SVConstants'
import { CreateFileModal } from './createFileModal'
import { TestSelectorModal } from './testSelectorModal'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

const { CATEGORIES, MODAL_TYPES } = Values

/**
 * Manages which modal to display
 * @returns {null|Component}
 */
export const ModalManager = () => {
  const { activeModal, visible } = useStoreItems(CATEGORIES.MODALS) || {}

  switch (activeModal) {
    case MODAL_TYPES.TEST_SELECTOR:
      return <TestSelectorModal visible={visible} />
    case MODAL_TYPES.CREATE_FILE:
      return <CreateFileModal visible={visible} />
    default:
      return null
  }
  
}