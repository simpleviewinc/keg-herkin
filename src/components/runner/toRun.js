import React from 'react'
import { View } from '@keg-hub/keg-components/view'

export const ToRun = React.forwardRef(({ features, styles }, ref) => {
  return (
    <View
      className={`torun-container`}
      style={styles.main}
    >
      <div
        ref={ref}
        style={styles.features}
        className="torun-tests"
        dangerouslySetInnerHTML={{ __html: features}}
      />
    </View>
  )
})