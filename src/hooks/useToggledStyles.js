import { useMemo } from 'react'

export const useToggledStyles = (toggled, styles) => {
  return useMemo(() => {
    const toggleStyles = toggled ? styles?.open : styles?.closed
    return {
      main: {
        ...styles?.default?.main,
        ...toggleStyles?.main
      },
      text: {
        ...styles?.default?.text,
        ...toggleStyles?.text
      },
    }
  }, [ toggled, styles ])
}