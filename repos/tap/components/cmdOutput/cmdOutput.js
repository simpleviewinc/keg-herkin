import React from "react"
import { useSockr } from '@ltipton/sockr'
import { useStyle } from '@keg-hub/re-theme'
import { RenderOutput } from './renderOutput'
import { Surface } from 'SVComponents/surface'
import { Row } from '@keg-hub/keg-components/row'
import { Grid } from '@keg-hub/keg-components/grid'

export const CmdOutput = props => {
  const { activeTestFile } = props
  const styles = useStyle(`cmdOutput`, props.styles)
  const sockr = useSockr()
  
  console.log(`---------- sockr ----------`)
  console.log(sockr)
  
  return (
    <Surface
      className={`results-main`}
      prefix={`Test Results`}
      title={activeTestFile.name}
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