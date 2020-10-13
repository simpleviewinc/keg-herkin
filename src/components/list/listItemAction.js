import { TouchableIcon, View } from 'SVComponents'

export const ListItemAction = props => {
  const { name, action, styles, icon } = props
  return (
    <View
      className='list-item-action-wrapper'
      style={styles.main}
    >
      <TouchableIcon
        className='list-item-action-icon'
        name={icon || name}
        onPress={action}
        styles={styles}
        size={size}
      />
    </View>
  )
  
}