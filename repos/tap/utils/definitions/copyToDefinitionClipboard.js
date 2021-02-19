import { Clipboard } from 'react-native'
import { capitalize } from '@keg-hub/jsutils'

/**
 * Copies a definitions matcher text to the users clipboard
 * @function
 * @public
 * @export
 * @param {Object} definition - definition model object
 *
 * @return {void}
 */
export const copyToDefinitionClipboard = definition => {
  if(!definition || !definition.name)
    return console.warn(`Can not copy to clipboard, a definition is require!`, definition)

  const copyText = `${capitalize(definition.type)} ${definition.name}`.trim()
  Clipboard.setString(copyText)

  // TODO: Add toast notifications and remove this log
  // Add notifications that definition was copied to the users clipboard
  console.log(`Copied definition to clipboard:\n\n`, copyText)
}