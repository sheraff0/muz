import React from 'react'
import { useSelector } from 'react-redux'
import { TableFactory, tableSchemas } from '.'
import { scopes } from '../../store'

export default ({
  scope, api_function,
  onActions,
  ...props
}) => {
  const model = scopes()[scope].modelName
  const meta = useSelector(state => state.meta.LIST.data?.[model])
  const data = useSelector(state => state[scope][api_function].data)

  const many = (meta?.fields.id.type !== 'OneToOneField')

  // Create full DataTable descipton, with data
  const hydratedTableSchema = () => {
    const drySchema = tableSchemas(scope, onActions)
    const {columns, titles, sorted, render} = drySchema

    // Retrieve Model verbose name
    const modelVerboseName = () =>
      meta?.
        model_verbose_name

    // Retrieve Model field's verbose name for each field.
    // Defaults to Serializer field's name
    const fieldVerboseName = col =>
      col !== 'CONTROLS' && (
        meta?.
          fields[col]?.
            details.verbose_name || col
      )
      const columnsParser = columns =>
      columns.map(col => ({
        key: col,
        dataIndex: col !== 'CONTROLS' && col,
        title:  
          titles?.[col] ||  // Column title taken from `titles` schema attribute...
            fieldVerboseName(col),  // ... or from `meta` field's `verbose name`
        ...(sorted?.[col] && {
          sorter: {
            compare: ((a, b) => ('' + a[col]).localeCompare(b[col])),
            multiple: sorted[col].order || 1,
          }
        }),
        ...(sorted[col]?.fixed && {
          sortOrder: 'ascend'
        }),
        render:
          render?.[col]
      })) 
    
    const dataParser = data =>
      data &&
        data.map(item =>
          Object.fromEntries(
            [['key', item.id]].concat(
              columns.map(col => [
                col, item[col]
              ])
            )
          )
        )

    return ({
      tableHeader: modelVerboseName(),
      columns: columnsParser(columns),
      dataSource: dataParser(data),
    })
  }

  return (
    <TableFactory
      {...hydratedTableSchema()}
      onActions={onActions}
      many={many}
      {...props} 
    />
  )
}