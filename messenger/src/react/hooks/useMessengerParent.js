import { useEffect } from 'react'
import { MessengerParent } from '../../parent/messengerParent'
import { checkCall, noOpObj, noOp } from '@keg-hub/jsutils'

let ParentInstance

export const useMessengerParent = (config=noOpObj, callback=noOp) => {
  useEffect(() => {
    ParentInstance = ParentInstance || new MessengerParent(config)
    checkCall(callback, ParentInstance)
  }, [])
}
