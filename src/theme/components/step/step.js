import { tapColors } from '../../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'
const inputHeight = theme?.form?.input?.default?.height ?? 35

const selectWidth = 90

export const step = {
  main: {
    mT: theme.margin.size,
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
  typeSelect: {
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
        ftWt: 'bold',
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
  },
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
  }
}