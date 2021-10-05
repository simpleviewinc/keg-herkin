import { useMemo } from 'react'

/**
 * Custom hook to find the size and color props for an Icon component
 * @param {Object=} props - Properties passed to the component
 * @param {Object=} style - Style object used to apply custom styles to the component
 *
 * @returns {Object} - Contains the height, width, and color properties and values 
 */
export const useIconProps = (props, style) => {
  return useMemo(() => {
    const {
      height,
      width,
      color,
      fill,
      size,
      stroke,
    } = props

    const styleSize = props?.style?.fontSize || style?.fontSize
    const styleColor = props?.style?.color ||
        style?.color ||
        props?.style?.backgroundColor ||
        style?.backgroundColor

    return {
      style,
      height: height || width || size || styleSize,
      width: width || height || size || styleSize,
      color: color || fill || stroke || styleColor,
    }
  }, [
    props.height,
    props.width,
    props.color,
    props.fill,
    props.size,
    props.stroke,
    props.style,
    style,
  ])
}