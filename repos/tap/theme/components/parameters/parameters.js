import { tapColors } from '../../tapColors'
import { sharedSelectInline } from '../shared/select'
import { sharedInputInline } from '../shared/input'

const table = theme => ({
  main: {
    bW: 1,
    bRad: tapColors.borderRadius,
    bC: tapColors.border,
    pB: theme.padding.size,
  },
  header: {
    main: {
      p: theme.padding.size,
      bgC: tapColors.accentBackground,
      borderBottomWidth: 1,
      bRad: tapColors.borderRadius,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomColor: tapColors.border,
    },
    column0: {
      size: 3
    },
    column1: {
      size: 9
    },
    text: {
      ftWt: 'bold',
    }
  },
  row: {
    main: {
      mT: theme.margin.size,
      pH: theme.padding.size,
    },
    highlight: {
      inactive: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: `transparent`,
        bRad: tapColors.borderRadius,
        ...theme.transition([ 'borderColor' ], 0.5),
      },
      active: {
        borderColor: tapColors.link,
      }
    },
    column: {

    },
    column0: {
      size: 3
    },
    column1: {
      size: 9
    }
  }
})

const dynamic = theme => ({
  string: {
    ...sharedInputInline(theme),
  },
  select: {
    ...sharedSelectInline(theme),
  },
  boolean: {
    
  }
})

export const parameters = theme => ({
  table: table(theme),
  dynamic: dynamic(theme),
  main: {
    flex: 1,
    mT: theme?.margin?.size,
  },
  label: {
    color: tapColors.inactive,
  },
})