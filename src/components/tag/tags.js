import React, { useCallback, useRef } from 'react'
import { Grid, Input, Row, Text, View, Button } from 'SVComponents'
import { Tag } from './tag'
import { useTheme } from '@keg-hub/re-theme'
import {
  addFeatureTag,
  removeFeatureTag 
} from 'SVActions'


const BuildTags = ({ parent, styles }) => {
  const { tags } = parent
  return tags && tags.map(tag => {
    return (
      <Tag
        key={tag}
        parent={parent}
        removeTag={() => removeFeatureTag(parent, tag)}
        styles={styles}
        tag={tag}
      />
    )
  })
}

export const Tags = props => {
  const theme = useTheme()
  const { feature, scenario } = props
  const parent = feature || scenario
  const tagsStyles = theme?.tags

  const inputRef = useRef(null)
  const onAddTag = useCallback(() => {

    if(!inputRef.current) return
    const tag = inputRef.current.value

    addFeatureTag(parent, tag)
    // Clear out the input after saving the tag
    inputRef.current.value = ''

  }, [ inputRef.current, parent ])


  return (
    <Grid className={`tags-main`} style={tagsStyles.main} key={`${feature.feature}-tags-grid`} >
      <Row className={`tags-row`} style={tagsStyles.row} >
        <Text className={`tags-title`} style={tagsStyles.title} >
          {`Tags `}
        </Text>
        <View style={tagsStyles.container} className={`tags-container`} >
          <BuildTags parent={feature || scenario} styles={tagsStyles.tag} />
          <Input
            key={`${feature.feature}-tags-input`}
            ref={inputRef}
            className={`tags-input`}
            style={tagsStyles.input}
          />
          <Button
            className={`add-tag`}
            styles={tagsStyles.button}
            onPress={onAddTag}
          >
            ADD
          </Button>
        </View>
      </Row>
    </Grid>
  )
}


/*

*/