import { useMemo } from 'react'
import { Values } from 'SVConstants'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { noOp, noOpObj, capitalize } from '@keg-hub/jsutils'

const { CATEGORIES } = Values

/**
 * Check is an active files has pending content creates a title with a pending indicator
 * @param {Object} activeFile - The file with pending content
 *
 * @returns {string} - Memoized file type with pending mark when pending content exists
 */
export const usePendingMark = activeFile => {
  const { pendingFiles=noOpObj } = useStoreItems([CATEGORIES.PENDING_FILES])
  const hasPending = Boolean(pendingFiles[activeFile?.location])

  return useMemo(() => {
    const pendingMark = hasPending ? '*' : ''
    return `${capitalize(activeFile?.fileType)} ${pendingMark}`.trim()
  }, [hasPending, activeFile?.fileType])

}