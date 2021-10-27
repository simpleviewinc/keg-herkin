import { useMemo } from "react"
import { useDimensions } from '@keg-hub/re-theme'
import { noOpObj, isNum } from '@keg-hub/jsutils'

export const useResizeProps = (props=noOpObj) => {
  const {
    height,
    width,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    diffHeight=0,
    diffWidth=0,
    resizeRatio,
    bounds='parent',
    lockAspectRatio,
  } = props

  const dims = useDimensions()
  
  return useMemo(() => {
    // Default width to 100%
    const initialWidth = (width === 'dimension' || width === 'dim')
      ? dims.width
      : (width || '100%')

    // Height doesn't work like width, so we default to full dimension height
    const initialHeight = height || dims.height
    
    return {
      bounds,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      resizeRatio,
      lockAspectRatio,
      defaultSize: {
        height: isNum(initialHeight) ? (initialHeight - diffHeight) : initialHeight,
        width: isNum(initialWidth) ? (initialWidth - diffWidth) : initialWidth,
      }
    }
  
  }, [
    dims.height,
    dims.width,
    height,
    width,
    bounds,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    diffHeight,
    diffWidth,
    resizeRatio,
    lockAspectRatio,
  ])
}