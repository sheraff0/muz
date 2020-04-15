import React from 'react'
import { Select } from 'antd'
import { filterOption } from '../../utils'

const { Option } = Select

export default ({
  listData,
  onSelect,
  ...props
}) =>
  <Select 
    showSearch 
    optionFilterProp="children"
    filterOption={filterOption}
    onSelect={onSelect}
    {...props}
  >
    { listData?.length > 0 &&
      [[null, '- - - - - - -']]
      .concat(listData)
      .map(option =>
        <Option 
          key={option[0] || 0} 
          value={option[0]}
        >
          {option[1]}
        </Option>
      ) 
    }
  </Select>
      