import React from 'react'
import { Tags } from '../tag'
import { Surface } from '../surface'
import { Scenarios } from '../scenario'
import {
  addFeatureTag,
  removeFeatureTag 
} from 'SVActions'

export const Feature = props => {
  const { feature } = props
  if(!feature) return null

  return (
    <Surface title={feature.feature} >
      <Tags
        parent={feature}
        type={`feature`}
        title={`Tags `}
        onAdd={addFeatureTag}
        onRemove={removeFeatureTag}
      />
      <Scenarios feature={feature} />
    </Surface>
  )

}