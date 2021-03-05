import { devLog } from '../devLog'
import { getStore } from 'SVStore'
import { noOpObj } from '../helpers/noop'

/**
 * Logs warning message, and returns noop object
 * @function
 * @public
 * @export
 * @param {string} message - Message to log to the console
 * @param {*} extra - Extra items to log along with the message
 *
 * @return {Object} - Empty noop object
 */
const emptyResponse = (message, ...extra) => {
  devLog(`warn`, message, ...extra)
  return noOpObj
}

/**
 * Validates a feature exists within the store and has the correct properties
 * Checks property based on the passed in type param
 * @function
 * @public
 * @export
 * @param {Object} feature - Feature file model object
 * @param {string} type - Feature property to validate on the feature
 *
 * @return {Object} - Object containing the store features, items, and validated feature
 */
export const validateFeatureAction = (feature, type) => {

  if(!feature || !feature?.ast[type])
    return emptyResponse(`The ${type} does not exist on the feature.`, feature, type)

  const { items } = getStore()?.getState()
  if(!items || !items.features)
    return emptyResponse(`No features exist in the store!`, items)

  const { features } = items
  const index = features.findIndex(feat => feat?.ast?.feature === feature?.ast?.feature)
  if(index === -1) return emptyResponse(`Parent does not exist in the items store!`, items)

  return {
    items,
    index,
    feature,
    features,
  }

}