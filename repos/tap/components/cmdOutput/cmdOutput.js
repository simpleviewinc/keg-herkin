import React from "react"
import { useStyle } from '@keg-hub/re-theme'
import { RenderOutput } from './renderOutput'
import { Surface } from 'SVComponents/surface'
import { Row } from '@keg-hub/keg-components/row'
import { Grid } from '@keg-hub/keg-components/grid'
import { useSockrItems } from 'SVUtils/sockr'

export const CmdOutput = props => {
  const { activeFile } = props
  const styles = useStyle(`cmdOutput`, props.styles)

  return (
    <Surface
      className={`results-main`}
      prefix={`Test Results`}
      title={activeFile.name}
      capitalize={false}
      hasToggle={false}
      styles={styles}
    >
      <Grid className={`results-grid`} style={styles?.grid} >
        <Row className='results-results-row' style={styles?.row} >
          <RenderOutput />
        </Row>
      </Grid>
    </Surface>
  )
}