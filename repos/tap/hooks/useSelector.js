import { pickKeys } from '@keg-hub/jsutils'
import { useSelector as useSelectorRedux, shallowEqual } from 'react-redux'

export const useSelector = (...categories) => {
  return useSelectorRedux(({ items }) => pickKeys(
    items,
    categories,
  ), shallowEqual)
}