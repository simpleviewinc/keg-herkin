
export const getJestSymbolData = () => {
  const jestSym = Object.getOwnPropertySymbols(window)
    .find(sym => String(sym) === `Symbol(JEST_STATE_SYMBOL)`)

  return window[jestSym]
}
