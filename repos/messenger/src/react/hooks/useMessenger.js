/** @module hooks */

import { useContext, useEffect } from 'react'
import { MessengerContext } from '../context/messengerContext'

/**
 * Uses the useContext hook from react to get the current Messenger Instance
 * <br/> Requires wrapping App in the MessengerProvider
 *
 * @returns { Object } - Current Messenger Instance
 */
export const useMessenger = () => {
  return useContext(MessengerContext)
}