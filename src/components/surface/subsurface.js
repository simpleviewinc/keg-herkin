import React from 'react'
import { Grid, Row, View } from '@keg-hub/keg-components'
import { Subheader } from '../subheader'
import { useTheme } from '@keg-hub/re-theme'
const noOpObj = {}
const noOpStyles = noOpObj
const noOpClsNames = noOpObj

export const SubSurface = props => {
  const { classNames=noOpClsNames, styles=noOpStyles, title, children } = props
  const theme = useTheme()
  const surfaceStyles = theme.get('subsurface', styles.main)
  
  return (
    <Grid className={classNames.main} style={surfaceStyles.main} >
      <Row className={classNames.headerRow} style={surfaceStyles.headerRow} >
        <Subheader className={classNames.header} style={surfaceStyles.header} >
          {title}
        </Subheader>
      </Row>
      <Row className={classNames.containerRow} style={surfaceStyles.containerRow} >
        <View className={classNames.container} style={surfaceStyles.container} >
          {children}
        </View>
      </Row>
    </Grid>
  )
}