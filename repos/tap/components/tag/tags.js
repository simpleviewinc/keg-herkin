import { Tag } from './tag'
import { useStyle } from '@keg-hub/re-theme'
import React, { useCallback, useRef } from 'react'
import { Button, Grid, Icon, Input, Row, Text, View } from 'SVComponents'
import { PlusCircle } from 'SVAssets/icons'
import { checkCall, capitalize, get, isFunc, set } from '@keg-hub/jsutils'
import { noOpObj } from 'SVUtils/helpers/noop'

const BuildTags = props => {
  const { buildTag, parent, onRemove, styles, tags } = props

  return tags && tags.map(tag => {
    return isFunc(buildTag)
      ? buildTag(tag, parent, styles, onRemove)
      : (
          <Tag
            key={tag}
            parent={parent}
            removeTag={() => onRemove(parent, tag)}
            styles={styles}
            tag={tag}
          />
        )
  })
}

export const Tags = props => {
  const {
    addText=`ADD`,
    buildTag,
    onAdd,
    onRemove,
    parent=noOpObj,
    tags=parent?.tags,
    type=`keg`,
    title,
  } = props

  const tagsStyles = useStyle('tags', `tags.${type}`)
  const inputRef = useRef(null)
  const onAddTag = useCallback(() => {

    if(!inputRef.current)
      return console.warn(`Tag input ref is NOT set!`)
    
    // Get a ref to the new tag, so we can clear the input
    const tag = get(inputRef, 'current.value')
    // Clear out the input after saving the tag
    set(inputRef, 'current.value', '')

    // Call the passed in callback prop
    checkCall(onAdd, parent, tag, inputRef)

  }, [ inputRef.current, parent, onAdd ])

  return tags && (
    <Grid
    className={`tags-main`}
    style={tagsStyles.main}
    key={`${type}-tags-grid`}
    >
      <Row className={`tags-row`} style={tagsStyles.row} >
        { title && (
          <Text className={`tags-title`} style={tagsStyles.title} >
            {capitalize(title)}
          </Text>
        )}
        <View
          className={`tags-container`}
          style={tagsStyles.container}
        >
          <BuildTags
            tags={tags}
            parent={parent}
            styles={tagsStyles.tag}
            onRemove={onRemove}
            buildTag={buildTag}
          />
          <Input
            key={`${type}-tags-input`}
            ref={inputRef}
            className={`tags-input`}
            style={tagsStyles.input.input}
            touchStyle={tagsStyles.input.main}
          />
          { addText && (
            <Button
              className={`tag-action-add`}
              styles={tagsStyles?.button?.main}
              onPress={onAddTag}
            >
              <Icon
                className={`tag-action-icon`}
                styles={tagsStyles?.button?.icon}
                Element={PlusCircle}
              />
              <Text
                className={`tag-action-text`}
                style={tagsStyles?.button?.text}
              >
                {addText}
              </Text>
            </Button>
          )}
        </View>
      </Row>
    </Grid>
  ) || null
}


/*

*/