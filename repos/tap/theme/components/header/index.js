import { itemHeader } from './itemHeader'
import { subheader } from './subheader'

export const header = theme => ({
  header: { itemHeader: itemHeader(theme) },
  subheader: subheader(theme)
})
