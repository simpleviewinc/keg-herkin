import React, { useCallback } from 'react'
import { pickKeys, noPropArr } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { useSelector, shallowEqual } from 'react-redux'
import { setFeatureActive } from 'SVActions/features'
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

const { CATEGORIES } = Values

/**
 * Finds the node based on given id
 * @param {string} id 
 * @param {Array<object>} nodes 
 * 
 * @returns {object} node
 */
const findNode = (id, nodes) => {
  let foundNode = {}
  nodes.reduce((__, node) => {
    if (node.id === id) foundNode = node
    if (node.children.length > 0) {
      findNode(id, node.children)
    }
  }, {})

  return foundNode
}

/**
 * TreeList
 * @param {Object} props 
 */
export const TreeList = props => {

  const { features, fileTree=noPropArr } = useStoreItems([CATEGORIES.FEATURES, CATEGORIES.FILE_TREE])

  const onItemPress = useCallback(({node}) => {
    // for now only supporting feature file/content
    const match = features.find(feature => feature.fullPath === node.fullPath)
    match && loadFeature(match)
  }, [ features, setFeatureActive ])
  
  const getCollapsedNodeHeight = useCallback(({id}) => {
    const node = findNode(id, fileTree)
    return (node?.children?.length === 0 && node?.type === 'folder')
      ? 0
      : 40
  }, [fileTree])

  return !features
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
  if (level === 0 && node.children.length === 0 && node?.type === 'folder') return null

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
            style={[themeStyles?.icon, iconStyles]}
          />
        )
      }
    </View>
  )
}