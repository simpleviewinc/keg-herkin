/**
 * toggleRotationStyle
 * @param {Object} props
 * @param {Boolean} props.isToggled
 * @param {Number} props.onValue - degrees to rotate when toggled off
 * @param {Number} props.offValue - degrees to rotate when toggled on
 * 
 * @returns {Object} - style transform object
 */
export const toggleRotationStyle = ({isToggled=false, onValue=0, offValue=0}) => ({ 
  transform: isToggled 
    ? `rotate(${onValue}deg)` 
    : `rotate(${offValue}deg)` 
})