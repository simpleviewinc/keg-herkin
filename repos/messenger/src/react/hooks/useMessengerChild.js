import { useEffect } from 'react'
import { MessengerChild } from '../../child/messengerChild'
import { checkCall, noOpObj, noOp } from '@keg-hub/jsutils'

let ChildInstance

export const useMessengerChild = (config=noOpObj, callback=noOp) => {
  useEffect(() => {
    // Only setup messenger if we are in an Iframe
    if(window.parent === window) return

    ChildInstance = ChildInstance || new MessengerChild(config)

    !ChildInstance.isConnected &&
      (async () => await ChildInstance.connect())()
    
    checkCall(callback, ChildInstance)
  }, [])
}