import { getJestSymbolData } from './getJestSymbolData'


export const clearPreviousTests = () => {
  const jestData = getJestSymbolData()
  jestData?.currentDescribeBlock?.children.length &&
    (jestData.currentDescribeBlock.children = [])
}