import React from 'react'
import {  
  TreeList,
  Text,
  View,
  TouchableIcon
} from 'SVComponents'
import { NoteAdd } from 'SVAssets/icons'
import { useTheme } from '@keg-hub/re-theme'


/**
 * Title with Touchable NoteAdd icon
 * 
 * @param {object} props
 * @param {object} props.styles
 * @param {string} props.title
 * 
 * @returns {Component}
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
 * FileTree
 * @param {Object} props 
 * 
 * @returns {Component}
 */
export const FileTreePanel = (props) => {
  const theme = useTheme()
  const styles = theme.get('sidebar.content')
  return (
    <View>
      <FileTreeHeader 
        styles={styles?.testFiles}
        title={props?.title}
      />
      <TreeList />
    </View>
  )
}