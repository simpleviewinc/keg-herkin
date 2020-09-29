import React from 'react'
import { FlatList as FlatListRN } from 'react-native'
import { ListItem } from 'react-native-elements'

const keyExtractor = (item, index) => index.toString()

const renderItem = ({ item }) => {
  return (<ListItem { ...item } />)
}

export const FlatList = props =>  {
  const items = props.items || []

  return (
    <FlatListRN
      data-class='flat-list'
      keyExtractor={keyExtractor}
      data={items}
      renderItem={renderItem}
    />
  )
}