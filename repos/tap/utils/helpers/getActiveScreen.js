import { Values } from 'SVConstants'
const { CATEGORIES } = Values

/**
 * Gets the active screen from the passed in items
 * @type function
 * @param {Object} items - Items from the Store
 *
 * @returns {Object} - Found active screen 
 */
export const getActiveScreen = items => {
  return Object.values(items[CATEGORIES.SCREENS]).find(screen => screen.active)
}