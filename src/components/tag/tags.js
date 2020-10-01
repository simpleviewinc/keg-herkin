import React, { useCallback } from 'react'
import { Grid, Row, Text } from 'SVComponents'
import { Tag } from './tag'
import { useTheme } from '@keg-hub/re-theme'

  const useTagUpdate = (parent, tag, type) => {
    return useCallback((event) => {

      console.log(event)

    }, [ parent, tag, type ])
  }

const BuildTags = ({ parent, styles }) => {
  const { tags } = parent

  return tags && tags.map(tag => {
    return (
      <Tag
        addTag={useTagUpdate(parent, tag, 'add')}
        key={tag}
        parent={parent}
        removeTag={useTagUpdate(parent, tag, 'remove')}
        styles={styles}
        tag={tag}
      />
    )
  })
}

export const Tags = props => {
  const theme = useTheme()
  const { feature, scenario } = props
  const tagsStyles = theme?.tags
  
  return (
    <Grid style={tagsStyles.main} >
      <Row style={tagsStyles.row} >
        <Text style={tagsStyles.title} >
          {`Tags `}
        </Text>
        <BuildTags parent={feature || scenario} styles={tagsStyles.tag} />
      </Row>
    </Grid>
  )
}