import { useEffect, useMemo, useState } from 'react'
import { useMessengerChild } from '../../messenger/build/esm/react'

export const useParentMethods = () => {
  const [ page, setPage ] = useState(null)
  useMessengerChild({ onConnected: Messenger => {
    setPage(Messenger.parent.methods)
  }})

  return page
}