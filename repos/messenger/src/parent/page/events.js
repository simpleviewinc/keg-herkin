import { hasDomAccess, isFunc } from '@keg-hub/jsutils'
import { throwError } from '../../utils/throwError'

const pageEvents = [
  'close',
  'console',
  'crash',
  'dialog',
  'domcontentloaded',
  'download',
  'filechooser',
  'frameattached',
  'framedetached',
  'framenavigated',
  'load',
  'pageerror',
  'popup',
  'request',
  'requestfailed',
  'requestfinished',
  'response',
  'websocket',
  'worker',
]

const addEventListener = (event, callback) => {
  window.addEventListener(event, callback)
}

// TODO: not all events align directly with real dom events
// Will need to wrap other ( REAL DOM EVENTS ), to map them to the pageEvents list
export const on = (event, callback) => {
  return !pageEvents.includes(event)
    ? throwError(
        `Invalid event name ${event}. Must be one of ${pageEvents.join(', ')}`
      )
    : !isFunc(callback)
        ? throwError(`Callback must be a function`)
        : hasDomAccess()
          ? addEventListener(event, callback)
          : throwError(`Access to the Dom is required!`)
}
