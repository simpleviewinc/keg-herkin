import { screenModel } from 'SVModels'
import { Values } from 'SVConstants'

const { CATEGORIES, SCREENS } = Values

/**
 * Screens store using the screenModel helper
 * @type Object
 *
 * @returns {void}
 */
export const screens = {
  [CATEGORIES.SCREENS]: Object.keys(SCREENS)
    .reduce((models, name) => {
      models[SCREENS[name]] = screenModel({ id: SCREENS[name] })

      return models
    }, {})
}
