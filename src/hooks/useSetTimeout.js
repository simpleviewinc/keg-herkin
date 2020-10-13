import { useEffect } from 'react'
import { checkCall } from '@keg-hub/jsutils'

export const useSetTimeout = (callback, delay, condition) => {
  useEffect(() => {
    const timeout = condition && setTimeout(() => {
      checkCall(callback, condition)
    }, delay)

    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [delay, condition])
}
