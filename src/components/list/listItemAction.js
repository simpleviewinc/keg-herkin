import { TouchableIcon } from 'SVComponents'
import { useStyles } from 'SVHooks'


export const ListItemAction = props => {
  const { name, action, styles, icon } = props
  return (
    <View data-class='list-item-action-wrapper' style={ styles.main }  >
      <TouchableIcon
        data-class='list-item-action-icon'
        name={ icon || name }
        onPress={ action }
        styles={ styles }
        size={ size }
      />
    </View>
  )
  
}