import { useCallback, useState } from 'react'

/**
 * Hook to update when a tab is selected
 * @function
 * @param {string} initialTab - Currently active tab
 *
 * @returns {function} - Memoized callback used to update the active tab
 */
export const useActiveTab = initialTab => {
  const [activeTab, setActiveTab] = useState(initialTab)

  const setTab = useCallback(tab => {
    activeTab !== tab && setActiveTab(tab)
  }, [activeTab, setActiveTab])
  
  return [ activeTab, setTab ]
}