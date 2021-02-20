import React, { useCallback } from 'react'
import { noPropArr } from '@keg-hub/jsutils'
import { useTheme, useThemeHover } from '@keg-hub/re-theme'
import { setActiveFile } from 'SVActions/files/setActiveFile'
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
 * @param {Function} props.onSidebarToggled - function to toggle on/off the sidebar if needed
 * 
 */
export const TreeList = props => {

  const { fileTree=noPropArr } = useStoreItems([CATEGORIES.FILE_TREE])
  const { onSidebarToggled } = props

  const onItemPress = useCallback(({node}) => {
    if (node?.type !== 'file') return
    setActiveFile(node?.fullPath)
    onSidebarToggled(false)
  }, [ setActiveFile, onSidebarToggled ])
  
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
 * @param {Object} props.node - node object: { children, fullPath, id, isModified, name, type }
 * @param {Boolean} props.isExpanded - if the list item is expanded
 * @param {Boolean} props.hasChildrenNodes
 * 
 */
const NodeComponent = ({ node, level, isExpanded, hasChildrenNodes }) => {
  // don't display empty folders
  if (level === 0 && isEmptyFolderNode(node)) return null

  const { activeFile } = useStoreItems([CATEGORIES.ACTIVE_FILE])
  const theme = useTheme()
  const themeStyles = theme.get('treeList')
  const [ styleRef, mainStyles ] = useThemeHover(themeStyles?.default, themeStyles?.hover)
  // check if active file or expanded folder
  const isNodeActive = (isExpanded && node?.type === 'folder') || (activeFile?.fullPath === node?.fullPath)

  const nodeLevel = level === 0 ? 'root' : 'child'
  const styles = mainStyles?.[nodeLevel][node?.type]
  const activeStyle = themeStyles?.active?.[nodeLevel][node?.type]

  return (
    <View 
      ref={styleRef}
      style={[
        isNodeActive
          ? activeStyle?.main
          : styles?.main
        ,
        level && { paddingLeft: 15 * level }
      ]}
    >
      <Text
        style={
          isNodeActive 
            ? activeStyle?.text
            : styles?.text
        }
      >
        {
          node?.type === 'folder'
            ? node.name?.toUpperCase()
            : node.name
        }
      </Text>
      {
        node?.type === 'folder' &&
        (
          <ChevronDown
            size={mainStyles?.icon?.size || 16}
            style={[
              mainStyles?.icon, 
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