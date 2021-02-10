import React, { useCallback } from 'react'
import { pickKeys, exists } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { useSelector, shallowEqual } from 'react-redux'
import { setFeatureActive } from 'SVActions/features'
import {
  View,
  Loading,
  Text,
} from 'SVComponents'
import { Values } from 'SVConstants'
const { CATEGORIES } = Values
import TreeView from 'react-native-final-tree-view'
import { ChevronDown } from 'SVAssets/icons'

// import { reStyle } from '@keg-hub/re-theme/reStyle'

// const ReStyleView = reStyle(
//   View,
//   'style'
// )((__, props) => ({
//   ...props?.style,
//   padding: 8,
// }))
const testData = [
  {
    type: 'folder',
    id: '/keg/tap/tests/bdd',
    fullPath: '/keg/tap/tests/bdd',
    name: 'bdd',
    children: [
      {
        type: 'folder',
        id: '/keg/tap/tests/features',
        fullPath: '/keg/tap/tests/bdd/features',
        name: 'features',
        children: [
          {
            type: 'file',
            id: '/keg/tap/tests/features',
            fullPath: '/keg/tap/tests/bdd/features/google.feature',
            name: 'google.feature',
          },
        ],
      },
    ],
  },
]

export const TreeList = props => {

  const { features, activeFeature } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.FEATURES, CATEGORIES.ACTIVE_FEATURE ]
  ), shallowEqual)

  const onItemPress = useCallback((event, item) => {
    const match = features.find(feature => feature.feature === item.title)
    match && setFeatureActive(match)
    
  }, [ features ])

  const feature = exists(activeFeature?.index) && features[activeFeature?.index]


  
  return !features
    ? (<Loading />)
    : (
        <TreeView
          data={testData}
          renderNode={NodeComponent}
          onNodePress={(props) => {
            console.log(props)
          }}
          getCollapsedNodeHeight={() => 50}
        />
      )

}

const NodeComponent = ({ node, level, isExpanded, hasChildrenNodes }) => {
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
            size={themeStyles?.icon?.size || 20}
            style={[themeStyles?.icon, iconStyles]}
          />
        )
      }
    </View>
  )
}