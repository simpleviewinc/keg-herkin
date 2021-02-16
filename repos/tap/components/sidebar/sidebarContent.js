import React from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants'
import {  
  TreeList,
  Text,
  View,
  TouchableIcon
} from 'SVComponents'
import { NoteAdd } from 'SVAssets/icons'
import { useTheme } from '@keg-hub/re-theme'

const { CATEGORIES, SIDEBAR_TYPES } = Values

/**
 * Title with Touchable NoteAdd icon
 * 
 * @param {object} props
 * @param {object} props.styles
 * @param {string} props.title
 */
const FileTreeHeader = ({styles, title}) => {
  return (
    <View style={styles?.main}>
      <View style={styles?.textContainer}>
        <Text 
          style={styles?.text}
        >
          {title}
        </Text>
      </View>
      <View style={styles?.iconContainer}>
      <TouchableIcon
        Component={(
          <NoteAdd
            size={styles?.icon?.size}
            fill={styles?.icon?.fill}
            stroke={styles?.icon?.stroke}
          />
        )}
        onPress={() => console.log('---TODO: creating new file action----')}
      />
        
      </View>
    </View>
  )
}

/**
 * Manages the content displayed in the sidebar
 */
export const SidebarContent = () => {

  const { activeId } = useStoreItems(CATEGORIES.SIDEBAR) || {}
  const theme = useTheme()
  const styles = theme.get('sidebar.content')

  switch (activeId) {
    case SIDEBAR_TYPES.FILE_TREE:
      return (
        <View>
          <FileTreeHeader 
            styles={styles?.testFiles}
            title={'TEST FILES'}
          />
          <TreeList />
        </View>
      )
  
    default:
      return null
  }

}