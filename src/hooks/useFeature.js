import { Values } from 'SVConstants'
import { useDefinitions } from './useDefinitions'
import { pickKeys, checkCall } from '@keg-hub/jsutils'
import { useSelector, shallowEqual } from 'react-redux'
import React, { useState } from "react"

const { CATEGORIES } = Values

export const useFeature = () => {
  const { activeData, features, definitions } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.ACTIVE_DATA, CATEGORIES.FEATURES, CATEGORIES.DEFINITIONS ]
  ), shallowEqual)

  const feature = features && features[activeData?.feature]
  const defs = useDefinitions(feature, definitions)

  return { feature, definitions: defs }
}
