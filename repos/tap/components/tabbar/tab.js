import React from 'react'
import { useThemeHover } from '@keg-hub/re-theme'
import { useIconProps } from 'SVHooks/useIconProps'
import { isValidComponent } from '@keg-hub/keg-components'
import { Label, Icon, Touchable, renderFromType, View } from 'SVComponents'
import { get, isStr, deepMerge, isArr, isObj, noOpObj } from '@keg-hub/jsutils'

const TabIcon = ({ icon, location, styles, iconProps }) => {
  icon = isStr(icon) ? { name: icon } : icon

  return (
    <Icon
      className="tabbar-tab-icon"
      {...iconProps}
      { ...icon}
    />
  )
}

const renderByType = (Element, props) => {
  return isValidComponent(Element) ? (
    React.cloneElement(
      Element,
      props,
      Element.children
    )
  ) : isArr(Element) ? (
    Element
  ) : Wrapper ? (
    <Wrapper {...props}>{ Element }</Wrapper>
  ) : (
    Element
  )
}


const BuildChildren = (props) => {

  // If there are custom children, just return
  if(props.children) return renderByType(props.children, props)


  const { active, styles, icon, Icon:IconComp, Title, title='' } = props
  const TitleComp = Title || title
  const Components = []

  // If there's a title component || title string add it to the components array
  TitleComp && Components.push(
    // Check if it's a react component
    isValidComponent(TitleComp)
      ? (<TitleComp key={ 'title' } { ...props } />)
      : (
          <Label
            className='tabbar-tab-title'
            key={ 'title' }
            style={ styles.title || styles.text }
          >
            { TitleComp }
          </Label>
        )
  )

  // If not Icon component, just return
  if(!IconComp && !icon) return Components

  const iconData = isStr(icon) ? { name: icon } : (icon || noOpObj)
  // Get the location of the icon
  const location = get(icon, 'location', 'before')
  const iconProps = useIconProps(iconData, styles.icon[location])

  // Get the array add method based on the location
  const method = location === 'before' ? 'unshift' : 'push'
  // Use the method to add the icon component to the Components array
  Components[method](
    isValidComponent(IconComp)
      // If icon is a component, then call it and return 
      ? (<IconComp key={'icon'} {...iconProps} />)
      // Otherwise use the KegComponents Icon
      : (
          <Icon
            key={'icon'}
            className="tabbar-tab-icon"
            {...iconProps}
            { ...iconData}
          />
        )
  )

  return Components

}

/**
 * 
 * @param {Object} props
 * @param {Boolean} props.active
 * @param {string} props.id
 * @param {Function} props.onTabSelect
 * @param {Object} props.styles
 * @param {Boolean=} props.disabled
 */
export const Tab = props => {
  const { active, id, onTabSelect, styles, disabled=false } = props
  const [ styleRef, themeStyles ] = useThemeHover(styles.default, styles.hover)
  
  const mergedStyles = active
    ? deepMerge(themeStyles, styles.active)
    : themeStyles

  return (
    <Touchable
      disabled={disabled}
      touchRef={!disabled && styleRef}
      className="tabbar-tab"
      style={ mergedStyles.main }
      onPress={() => onTabSelect(id)}
    >
      <View className='tabbar-tap-icon-container' style={mergedStyles.container} >
        <BuildChildren
          {...props}
          styles={ mergedStyles }
        />
      </View>
    </Touchable>
  )
}
