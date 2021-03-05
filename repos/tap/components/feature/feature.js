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

  return feature && (
    <Surface
      title={feature?.ast?.feature}
      prefix={`Feature - `}
    >
      <Tags
        parent={feature}
        type={`feature`}
        title={`Tags `}
        onAdd={addFeatureTag}
        onRemove={removeFeatureTag}
      />
      <Scenarios feature={feature} />
    </Surface>
  ) || null

}