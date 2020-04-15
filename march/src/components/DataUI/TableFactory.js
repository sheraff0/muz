import React, { useState } from 'react'
import { Table, Row } from 'antd'
import { CreateButton, DeleteButton } from '../Controls'

export default ({
  tableHeader, columns, dataSource,
  onActions={},
  many=true,
  ...props
}) => {
  const [selectedRows, setSelectedRows] = useState([])
  const onDelete = () => {
    onActions.onDelete(selectedRows)
    setSelectedRows([])
  }
  return (
    <>
      <Row>
        <span className="page-header">{tableHeader || 'Тут что-то интересное...'}</span>
      </Row>
      <Row style={{ marginBottom: ".3rem" }}>
        <CreateButton onClick={() => onActions.onCreate()} 
          disabled={!(many || dataSource?.length < 1)}
        /> 
        <DeleteButton onClick={onDelete} text="Удалить выбранные" 
          disabled={selectedRows.length === 0} 
        />
      </Row>
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={{ 
          showSizeChanger: true,
          defaultPageSize: 25,
          pageSizeOptions: ['25', '50', '100'],
          showTotal: (total, range) => total > 25 && `${range[0]}-${range[1]} из ${total}`,
        }}
        size={props.size || "small"}
        rowSelection={{ 
          type: props.rowSelectionType || "checkbox",
          onChange: keys =>
            setSelectedRows(keys)
        }}
      />
    </>
  )
}