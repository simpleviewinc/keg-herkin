import React, { useState, useMemo, useEffect } from 'react'
import { MessengerContext } from './messengerContext'
import { MessengerChild } from '../../child/messengerChild'
import { MessengerParent } from '../../parent/messengerParent'


export const MessengerProvider = ({ children, ...props }) => {

  const MessengerType = useMemo(() => {
    return window.parent === window
      ? MessengerParent
      : MessengerChild
  }, [ window.parent === window ])

  const [ Messenger, setMessenger ] = useState(new MessengerType(props))

  useEffect(() => {
    Messenger &&
    Messenger.inIframe &&
      !Messenger.isConnected &&
      (async () => await Messenger.connect())()
  }, [ Messenger ])

  return (
    <MessengerContext.Provider value={Messenger}>
      { children }
    </MessengerContext.Provider>
  )
} 