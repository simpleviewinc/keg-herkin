import React from 'react'
import { TestSelectorModal } from './testSelectorModal'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants'

const { CATEGORIES, MODAL_TYPES } = Values

/**
 * Manages which modal to display
 * @returns {null|Component}
 */
export const ModalManager = () => {
  const { activeModal, visible } = useStoreItems(CATEGORIES.MODALS) || {}

  switch (activeModal) {
    case MODAL_TYPES.TEST_SELECTOR_MODAL:
      return <TestSelectorModal visible={visible} />
  
    default:
      return null
  }
  
}