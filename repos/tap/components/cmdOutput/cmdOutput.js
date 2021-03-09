import React from "react"
import { useSockr } from '@ltipton/sockr'
import { useStyle } from '@keg-hub/re-theme'
import { RenderOutput } from './renderOutput'
import { Surface } from 'SVComponents/surface'
import { Row } from '@keg-hub/keg-components/row'
import { Grid } from '@keg-hub/keg-components/grid'
import { useActiveTestOutput } from 'SVHooks/useActiveTestOutput'

export const CmdOutput = props => {
  const { activeTestFile } = props
  const styles = useStyle(`cmdOutput`, props.styles)
  const sockr = useSockr()
  
  const testFileOutput = useActiveTestOutput()

  return (
    <Surface
      className={`results-main`}
      prefix={`Test Output`}
      title={activeTestFile.name}
      capitalize={false}
      styles={styles.surface}
    >
      <Grid className={`results-grid`} style={styles?.grid} >
        <Row className='results-results-row' style={styles?.row} >
          <RenderOutput
            output={testFileOutput}
            testFile={activeTestFile}
          />
        </Row>
      </Grid>
    </Surface>
  )
}