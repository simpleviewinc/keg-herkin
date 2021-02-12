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

const TestFilesHeader = ({styles, title}) => {
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
  let Content = null
  let Header = null
  switch (activeId) {
    case SIDEBAR_TYPES.TEST_FILES:
      Content = () => <TreeList />
      Header = () => (
        <TestFilesHeader 
          styles={styles?.testFiles}
          title={'TEST FILES'}
        />
      )
      break
  
    default:
      break
  }
  return (
    <View>
      <Header/>
      <Content/>
    </View>
  )
}