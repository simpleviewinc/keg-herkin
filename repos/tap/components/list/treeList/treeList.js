import React, { useCallback } from 'react'
import { noPropArr } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { setActiveFile } from 'SVActions/files/setActiveFile'
import { loadFeature } from 'SVActions/features/loadFeature'
import {
  View,
  Loading,
  Text,
} from 'SVComponents'
import { Values } from 'SVConstants'
import TreeView from 'react-native-final-tree-view'
import { ChevronDown } from 'SVAssets/icons'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { isEmptyFolderNode } from 'SVUtils/fileTree'
import { toggleRotationStyle } from 'SVUtils/theme'

const { CATEGORIES } = Values

/**
 * Finds the node based on given id
 * @param {string} id 
 * @param {Array<object>} nodes 
 * 
 * @returns {object} node
 */
const findNode = (id, nodes) => 
  nodes.find((node) => {
    return node.id === id 
      ? node
      : node.children.length && findNode(id, node.children)
  }, {})


/**
 * TreeList
 * @param {Object} props 
 */
export const TreeList = props => {

  const { fileTree=noPropArr } = useStoreItems([CATEGORIES.FILE_TREE])

  const onItemPress = useCallback(({node}) => {
    node?.type === 'file' && setActiveFile(node?.fullPath)
  }, [ loadFeature ])
  
  const getCollapsedNodeHeight = useCallback(({id}) => {
    const node = findNode(id, fileTree)
    return (isEmptyFolderNode(node))
      ? 0
      : 40
  }, [fileTree])

  return !fileTree
    ? (<Loading />)
    : (
        <TreeView
          data={fileTree}
          renderNode={NodeComponent}
          onNodePress={onItemPress}
          getCollapsedNodeHeight={getCollapsedNodeHeight}
        />
      )

}

/**
 * Component for list item based on the props
 * prop ref: https://github.com/zaguiini/react-native-final-tree-view#rendernode
 * @param {Object} props 
 * @param {Object} props.node - node object
 * @param {Boolean} props.isExpanded - if the list item is expanded
 * @param {Boolean} props.hasChildrenNodes
 * 
 */
const NodeComponent = ({ node, level, isExpanded, hasChildrenNodes }) => {
  // don't display empty folders
  if (level === 0 && isEmptyFolderNode(node)) return null

  const theme = useTheme()
  const themeStyles = theme.get('treeList')
  const styles = level === 0
    ? themeStyles?.header
    : themeStyles?.item

  const iconStyles = { transform: isExpanded ? 'rotate(180deg)' : 'rotate(360deg)' }

  return (
    <View style={[styles?.main, level > 0 && { marginLeft: 10 * level }]}>
      <Text
        style={styles?.text}
      >
        {node.name}
      </Text>
      {
        node?.type === 'folder' &&
        (
          <ChevronDown
            size={themeStyles?.icon?.size || 16}
            style={[
              themeStyles?.icon, 
              toggleRotationStyle({
                isToggled: isExpanded,
                onValue: 180,
                offValue: 0
              })
            ]}
          />
        )
      }
    </View>
  )
}