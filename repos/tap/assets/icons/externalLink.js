import * as React from 'react'
import { SvgIcon } from '@keg-hub/keg-components'

export const ExternalLink = props => {
  return (
    <SvgIcon
      {...props}
      viewBox='0 0 24 24'
      delta={'M18 10.82a1 1 0 00-1 1V19a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h7.18a1 1 0 000-2H5a3 3 0 00-3 3v11a3 3 0 003 3h11a3 3 0 003-3v-7.18a1 1 0 00-1-1zm3.92-8.2a1 1 0 00-.54-.54A1 1 0 0021 2h-6a1 1 0 000 2h3.59L8.29 14.29a1 1 0 000 1.42 1 1 0 001.42 0L20 5.41V9a1 1 0 002 0V3a1 1 0 00-.08-.38z'}
    />
  )
}
