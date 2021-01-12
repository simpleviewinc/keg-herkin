import { $ } from '../../page/selectors'
import { throwNoElement } from '../../utils/errors/throwNoElement'
import { throwNoSelector } from '../../utils/errors/throwNoSelector'

export const withSelector = cb => {
  return (selector, ...args) => {
    !selector && throwNoSelector()

    const element = $(selector)
    !element && throwNoElement(selector)

    return cb(element, selector, ...args)
  }
}
