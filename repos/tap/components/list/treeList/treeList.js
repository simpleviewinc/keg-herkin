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

const { CATEGORIES } = Values

/**
 * Temp: filter by feature files only for now
 * @param {Array<Object>} nodes 
 */
const filterFeature = (nodes) => {
  if (nodes.length === 0) return noPropArr

  const bddNode = nodes[0]
  const str = '/features'
  const filteredChildren = bddNode?.children.reduce((updatedNodes, node) => {
    node?.fullPath.includes(str) && updatedNodes.push(node)
    return updatedNodes
  }, [])

  bddNode.children = filteredChildren
  return [bddNode]
}


/**
 * TreeList
 * @param {Object} props 
 */
export const TreeList = props => {

  const { features, fileTree=noPropArr } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.FEATURES, CATEGORIES.FILE_TREE ]
  ), shallowEqual)

  const filteredData = filterFeature(fileTree)
  const onItemPress = useCallback(({node}) => {
    // for now only supporting feature file/content
    const match = features.find(feature => feature.fullPath === node.fullPath)
    match && loadFeature(match)
  }, [ features, setFeatureActive ])
  
  return !features
    ? (<Loading />)
    : (
        <TreeView
          data={filteredData}
          renderNode={NodeComponent}
          onNodePress={onItemPress}
          getCollapsedNodeHeight={() => 40}
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