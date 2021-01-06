import { useEffect, useMemo, useState } from 'react'
import { useMessengerChild } from '@keg-hub/messenger/build/esm/reactChild'

export const useParentMethods = () => {
  const [ page, setPage ] = useState(null)
  useMessengerChild({ onConnected: Messenger => {
    setPage(Messenger.parent.methods)
  }})

  return page
}