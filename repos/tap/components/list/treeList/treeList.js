import React, { useCallback, useMemo } from 'react'
import { noOpObj, deepMerge } from '@keg-hub/jsutils'
import { useTheme, useThemeHover, useStyle } from '@keg-hub/re-theme'
import { loadTestFile } from 'SVActions/files/api/loadTestFile'
import {
  View,
  Loading,
  Text,
} from 'SVComponents'
import { Values } from 'SVConstants'
import TreeView from 'react-native-final-tree-view'
import { ChevronDown } from 'SVAssets/icons'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { isEmptyFolderNode, findNode, constructFileTree } from 'SVUtils/fileTree'
import { toggleRotationStyle } from 'SVUtils/theme'

const { CATEGORIES } = Values

/**
 * Hook to get the correct styles for the tree node
 * @param {number} level - Current location within the tree of the nodes to be rendered
 * @param {string} nodeType - The type of node being checked ( Folder || File )
 * @param {boolean} isNodeActive - Is the node currently active
 * 
 * @returns {Object} - Reg for the root node, and the styles to be applied
 */
const useTreeStyles = (level, nodeType, isNodeActive) => {
  const theme = useTheme()
  const themeStyles = useStyle('treeList')
  const [ styleRef, mainStyles ] = useThemeHover(themeStyles?.default, themeStyles?.hover)
  const padSize = theme.padding.size

  return useMemo(() => {
    const nodeLevel = level === 0 ? 'root' : 'child'
    const styles = mainStyles?.[nodeLevel][nodeType]
    const activeStyle = themeStyles?.active?.[nodeLevel][nodeType]

    return {
      styleRef,
      mainStyles,
      styles: deepMerge(
        (isNodeActive ? activeStyle : styles),
        level && { main: { paddingLeft: padSize * level } },
      )
    }

  }, [
    theme,
    level,
    padSize,
    styleRef,
    nodeType,
    mainStyles,
    themeStyles,
    isNodeActive,
  ])
}

/**
 * Hook to memoize is a node is active base on it's path and the current active file path
 * @param {boolean} isExpanded - Is the node currently expanded
 * @param {string} nodeType - The type of node being checked ( Folder || File )
 * @param {Object} nodePath - Path to the node on the local file system
 * @param {Object} filePath - Path to the active file on the local file system
 * 
 * @returns {boolean} - True if the node is active
 */
const useNodeActive = (isExpanded, nodeType, nodePath, filePath) => useMemo(() => {
  return (isExpanded && nodeType === 'folder') || (filePath === nodePath)
}, [isExpanded, nodeType, nodePath, filePath])

/**
 * Hook to memoize the name of the node based on it's type
 * @param {Object} node - node object: { children, location, id, modified, name, type }
 * 
 * @returns {string} - Name of the node
 */
const useNodeName = node => useMemo(() => {
  return node?.type === 'folder'
    ? node.name?.toUpperCase()
    : node.name
}, [ node?.type, node?.name ])

/**
 * Hook to memoize to check which tree node has pending changes
 * @param {Array<FileModel>} pendingFiles - array of fileModels
 * @param {string} location - full path of current node location
 * 
 * @returns {string} - Name of the node
 */
const usePendingContent = (pendingFiles, location) => useMemo(() => {
  return pendingFiles && pendingFiles[location]
}, [
  location,
  pendingFiles
])

/**
 * TreeList
 * @param {Object} props 
 * @param {Function} props.onSidebarToggled - function to toggle on/off the sidebar if needed
 * 
 */
export const TreeList = props => {

  const { fileTree=noOpObj } = useStoreItems([CATEGORIES.FILE_TREE])
  const { rootPaths, nodes } = fileTree
  const { onSidebarToggled } = props

  const tree = useMemo(() => constructFileTree(rootPaths, nodes), [rootPaths, nodes])

  const onItemPress = useCallback( async ({node}) => {
    if (node?.type !== 'file') return
    await loadTestFile(node.location)

    onSidebarToggled(false)

  }, [ loadTestFile, onSidebarToggled ])
  
  const getCollapsedNodeHeight = useCallback(({id}) => {
    const node = findNode(id, nodes)
    return (isEmptyFolderNode(node))
      ? 0
      : 40
  }, [tree])

  return !tree
    ? (<Loading />)
    : (
        <TreeView
          data={tree || []}
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
 * @param {Object} props.node - node object: { children, location, id, modified, name, type }
 * @param {Boolean} props.isExpanded - if the list item is expanded
 * @param {Boolean} props.hasChildrenNodes
 * 
 */
const NodeComponent = ({ node, level, isExpanded, hasChildrenNodes }) => {

  const { activeFile, pendingFiles } = useStoreItems([CATEGORIES.ACTIVE_FILE, CATEGORIES.PENDING_FILES])
  const nodeName = useNodeName(node)
  const nodeType = node?.type

  // Check if active file or expanded folder
  const isNodeActive = useNodeActive(isExpanded, nodeType, activeFile?.location, node?.location)
  const showPending = usePendingContent(pendingFiles, node?.location)
  const {
    styles,
    styleRef,
    mainStyles,
  } = useTreeStyles(level, nodeType, isNodeActive)
  
  // Don't display empty folders
  if (level === 0 && isEmptyFolderNode(node)) return null

  return (
    <View 
      className={[`tree-node-main`, isExpanded ? `tree-node-expanded` : ``]}
      ref={styleRef}
      style={styles?.main}
    >
      <Text
        className={`tree-node-name`}
        style={styles?.text}
      >
        { nodeName }
        {showPending && 'PENDING CHANGES'}
      </Text>
      {
        nodeType === 'folder' &&
        (
          <ChevronDown
            className={`tree-node-icon`}
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