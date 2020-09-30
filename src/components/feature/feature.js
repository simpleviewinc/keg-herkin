import React from 'react'
import { Tags } from '../tag'
import { Surface } from '../surface'
import { Scenarios } from '../scenario'

export const Feature = props => {
  const { feature } = props
  if(!feature) return null


  return (
    <Surface title={feature.feature} >
      <Tags feature={feature} />
      <Scenarios feature={feature} />
    </Surface>
  )

}