import { tapColors } from '../../tapColors'
import { deepMerge } from '@keg-hub/jsutils'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'
const inputHeight = theme?.form?.input?.default?.height ?? 35

const selectWidth = 90
const btnStyles = {
  main: {
    height: '100%',
    borderRadius: 3,
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    bgC: tapColors.link,
  }
}

const selectStyles = {
  main: {
    bW: 0,
    bgC: theme.colors.palette.transparent,
    w: selectWidth,
    minW: selectWidth,
    height: 'auto',
    minH: 'auto',
    maxH: 'auto',
  },
  select: {
    $all: {
      c: tapColors.default,
      bgC: theme.colors.palette.transparent,
      d: 'flex',
      alignItems: 'center',
      alignSelf: 'flex-start',
      c: tapColors.default,
      pH: theme.padding.size,
      mR: theme.margin.size / 3,
      bCR: tapColors.border,
      borderRightWidth: 1,
      bgC: tapColors.accentBackground,
      ftWt: 'bold',
      w: selectWidth,
      minW: selectWidth,
      height: 'auto',
      minH: 'auto',
      maxH: 'auto',
    }
  },
  icon: {
    container: {
      color: tapColors.default,
      position: 'absolute',
      zIndex: 1,
      right: 10,
      top: 12,
      pointerEvents: 'none',
    },
    icon: {
      color: tapColors.default,
      fontSize: 12,
    }
  },
}

export const step = {
  main: {
    mT: theme.margin.size * 2,
    pB: 0,
  },
  container: {
    p: 0,
    bW: 1,
    bRad: 3,
    minH: inputHeight,
    maxH: inputHeight,
    bC: tapColors.border,
    bgC: tapColors.backGround,
    overflow: 'hidden',
    flexDirection: `row`
  },
  typeSelect: selectStyles,
  text: {
    container: {
      d: 'flex',
      fl: 1,
      mL: 10,
      flexWrap: 'wrap',
      jtC: 'center',
      alI: 'flex-start',
    },
    text: {
      ftSz: 14,
    }
  },
  editButton: {
    default: btnStyles,
    hover: deepMerge(btnStyles, {
      main: { bgC: tapColors.linkDark }
    }),
    active: deepMerge(btnStyles, {
      main: { bgC: tapColors.linkLight }
    }),
    disabled: deepMerge(btnStyles, {
      main: { bgC: tapColors.linkLight }
    })
  },
  selectStep: deepMerge(selectStyles, {
    main: {
      d: 'flex',
      fl: 1,
      flexWrap: 'wrap',
      jtC: 'center',
      alI: 'flex-start',
      w: 'auto',
      minW: 'auto',
    },
    select: {
      $all: {
        w: `100%`,
        ftWt: '500',
      }
    }
  })
}