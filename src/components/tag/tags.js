import React from 'react'
import { Grid, Row, Text } from 'SVComponents'
import { Tag } from './tag'

const BuildTags = ({ parent }) => {
  const { tags } = parent

  return tags && tags.map(tag => {
    return (
      <Tag
        key={tag}
        tag={tag}
        parent={parent}
      />
    )
  })
}

export const Tags = props => {
  const { feature, scenario } = props

  return (
    <Grid style={{ padding: 15, paddingBottom: 0 }} >
      <Row>
        <Text>
          {`Tags `}
        </Text>
        <BuildTags parent={feature || scenario} />
      </Row>
    </Grid>
  )
}