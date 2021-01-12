import { useEffect } from 'react'
import { MessengerChild } from '../messengerChild'
import { checkCall, noOpObj, noOp } from '@keg-hub/jsutils'

let ChildInstance

/**
 * Uses the useEffect hook from react to get and instance of the Child Messenger
 * <br/>Does **NOT** require wrapping App in the MessengerProvider
 *
 * @returns { Object } - Current Messenger Instance
 */
export const useMessengerChild = ({ onConnected, ...config }) => {
  useEffect(() => {
    // Only setup messenger if we are in an Iframe
    if (window.parent === window) return

    if (!ChildInstance) ChildInstance = new MessengerChild(config)

    !ChildInstance.isConnected &&
      (async () => await ChildInstance.connect({ onConnected }))()
  }, [])
}
