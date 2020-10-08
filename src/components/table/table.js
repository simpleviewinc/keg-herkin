
import React from 'react'
import { useIds } from 'SVHooks/useIds'
import { useTheme } from '@keg-hub/re-theme'
import { noOpObj, noOpArr } from 'SVUtils/helpers/noop'
import { isFunc, isArr, isStr, isObj, isNum } from '@keg-hub/jsutils'
import { Column, Row, Text, View, isValidComponent, renderFromType } from '@keg-hub/keg-components'

const Wrapper = props => {
  const { styles, children } = props
  return (
    <Text className={`table-column-text`} style={styles?.text} >
      {children}
    </Text>
  )
}

const RenderColumns = props => {
  const { ids=noOpArr, row, styles=noOpObj } = props

  const theme = useTheme()
  const columnSize = 12 / row.length

  return row.map((item, index) => {
    const { size, ...colStyles } = (styles && styles[`column${index}`] || noOpObj)

    return (
      <Column
        size={size || columnSize}
        key={ids[index] || index}
        className={`table-column`}
        style={theme.get(styles?.column, colStyles)}
      >
        { renderFromType(item, props, Wrapper) }
      </Column>
    )
  })
}

const RenderRow = props => {
  const { styles=noOpObj, ids=noOpArr } = props
  return (
    <Row
      key={ids[0]}
      className={`table-column-row`}
      style={styles.main}
    >
      <RenderColumns
        {...props}
        ids={ids}
        styles={styles}
      />
    </Row>
  )
}

const getRowKey = row => {
  return isStr(row) || isNum(row)
    ? row
    : isObj(row)
      ? row.key || row.id || row.uuid || row.uid || row.title || row.name
      : isArr(row) && row.length
        ? getRowKey(row[0])
        // TODO: update this to use the hasher function from retheme useCss hook
        : row
}


const BuildRow = props => {
  const { row, renderRow, RowCustom } = props
  return isFunc(renderRow)
    ? renderRow(props)
    : isValidComponent(RowCustom)
      ? (<RowCustom {...props} />)
      : (<RenderRow {...props} row={row} />)
}

export const Table = props => {
  const {
    Header,
    headerRow,
    rows,
    renderRow,
    Row:RowCustom,
    renderHeader,
    styles
  } = props

  const theme = useTheme()
  const tableStyles = theme.get('table', styles)

  return (
    <View style={tableStyles?.main} >
      {(headerRow || Header || renderHeader) && (
        <BuildRow
          row={headerRow}
          index={-1}
          ids={headerRow}
          RowCustom={Header}
          renderRow={renderHeader}
          styles={tableStyles?.header}
        />
      )}
      {isArr(rows) && rows.map((row, index) => {
        const ids = useIds(row)
        return (
          <BuildRow
            key={ids[0]}
            ids={ids}
            row={row}
            index={index}
            RowCustom={RowCustom}
            renderRow={renderRow}
            styles={tableStyles?.row}
          />
        )
      })}
    </View>
  )
}
