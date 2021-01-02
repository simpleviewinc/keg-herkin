import { useEffect } from 'react'
import { MessengerChild } from '../../child/messengerChild'
import { checkCall, noOpObj, noOp } from '@keg-hub/jsutils'

let ChildInstance

export const useMessengerChild = (config=noOpObj, callback=noOp) => {
  useEffect(() => {
    ChildInstance = ChildInstance || new MessengerChild(config)

    !ChildInstance.isConnected &&
      (async () => await ChildInstance.connect())()
    
    checkCall(callback, ChildInstance)
  }, [])
}