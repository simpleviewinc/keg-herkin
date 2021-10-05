import { Platform } from 'react-native'
import { exists } from '@keg-hub/jsutils'

/**
 * Automatically adds the useNativeDriver property to the passed in config when needed
 * Set to false when platform is web
 * @param {Object} config - Animation config object
 *
 * @returns {Object} - config object with useNativeDriver property set
 */
export const setNativeDriver = (config={}) => {
  !exists(config.useNativeDriver) &&
    (config.useNativeDriver = Platform.OS !== 'web')

  return config
}