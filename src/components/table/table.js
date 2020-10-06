
import React, { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { Column, Row, Text, View, isValidComponent, renderFromType } from '@keg-hub/keg-components'
import { doIt, uuid, eitherArr, isArr, isStr, isObj, isNum } from '@keg-hub/jsutils'

const useIds = (rowData) => {
  const deps = eitherArr(rowData, [rowData])
  return useMemo(() => {
    return doIt(rowData.length, null, uuid)
  }, [ ...deps ])
}

const Wrapper = props => {
  const { styles, children, id, uuid } = props
  return (
    <Column
      className={`table-column`}
      style={styles?.column}
      key={key || id || uuid}
    >
      <Text
        className={`table-column-text`}
        style={styles?.text} 
      >
        {children}
      </Text>
    </Column>
  )
}

const RenderRow = props => {
  const { row, styles } = props
  const ids = useIds(row)
  return (
    <Row
      className={`table-column-row`}
      style={styles.main}
    >
      {row.map((item, index) => {
        const memoId = ids[index]
        return renderFromType(item, {  ...props, id: memoId, key: memoId }, Wrapper)
      })}
    </Row>
  )
}

const getRowKey = row => {
  isStr(row) || isNum(row)
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
  const { Header, headerRow, rows, renderRow, Row:RowCustom, renderHeader, styles } = props
  const theme = useTheme()
  const tableStyles = theme.get('table', styles)
  
  return (
    <View style={ tableStyles?.main } >
      {(headerRow || Header || renderHeader) && (
        <BuildRow
          row={headerRow}
          index={-1}
          RowCustom={Header}
          renderRow={renderHeader}
          styles={tableStyles?.header}
        />
      )}
      {isArr(rows) && rows.map((row, index) => (
        <BuildRow
          key={getRowKey(row)}
          row={row}
          index={index}
          RowCustom={RowCustom}
          renderRow={renderRow}
          styles={tableStyles?.row}
        />
      ))}
    </View>
  )
}
