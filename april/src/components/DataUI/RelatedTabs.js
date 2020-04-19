import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Tabs } from 'antd'
import { scopeFromModel } from '../../store'
import { CrudCombo } from '.'

const { TabPane } = Tabs

export default ({
  related,
  id
}) => {
  const meta = useSelector(state => state.meta.LIST.data)
  return (
    <Tabs>
      <TabPane tab={ <>&mdash;</> } key={1} />
      { related.map(rel =>
        <TabPane 
          tab={meta?.[rel.model]?.model_verbose_name}
          key={rel.model}
        >
          <CrudCombo
            scope={scopeFromModel(rel.model)}
            parent={{ field_name: rel.field_name, id }}
          />
        </TabPane>
      )}
    </Tabs>
  )
}