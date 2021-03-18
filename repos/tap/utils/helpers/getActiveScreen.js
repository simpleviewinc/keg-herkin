import { Values } from 'SVConstants'
import { get } from '@keg-hub/jsutils'

const { CATEGORIES } = Values

/**
 * Gets the active screen from the passed in items
 * @type function
 * @param {Object} items - Items from the Store
 *
 * @returns {Object} - Found active screen
 */
export const getActiveScreen = (items, screenId) => {
  return (screenId && get(items, [CATEGORIES.SCREENS, screenId])) ||
    Object.values(items[CATEGORIES.SCREENS]).find(screen => screen.active)
}
