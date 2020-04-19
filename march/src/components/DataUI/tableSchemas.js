import React from 'react'
import { useSelector } from 'react-redux'
import { scopes } from '../../store'
import { EditButton, DeleteButton } from '../Controls'
// Description of App's Data-driven Tables structure.
// Returns dry schema for each data `scope` (stored in Redux).

// Define `columns` for Serializer fields you want to display.

// Define `titles` for custom Serializer field titles
// or to override Model's meta info.

// Define `sorted` for fields you want to have `sorter` attribute;
// numeric value stands for multiple sort priority of the field.

// Put `CONTROLS` in s separate field

export default (scope, onActions) => {
  const model = scopes()[scope].modelName
  const meta = useSelector(state => state.meta.LIST.data?.[model])

  const {onEdit, onDelete} = onActions
  const parseControls = () => ({
    CONTROLS: record => 
      <>
        <EditButton onClick={() => onEdit(record.key)} />
        <DeleteButton onClick={() => onDelete([record.key, ])} />
      </>
  })

  const dryTableSchemas = () => ({
    default: {
      columns: ['verbose_name', 'CONTROLS'],
      titles: {verbose_name: meta?.model_verbose_name ||
        'Без названия', },
      sorted: {
        verbose_name: {fixed: true}
      },
      render: parseControls(),
    },
    task: {
      columns: ['verbose_name', 'task_type', 'CONTROLS'],
      titles: {verbose_name: 'Задание', },
      sorted: {
        task_type: {order: 1}, verbose_name: {order: 2}, 
      },
      render: parseControls(),
    },
    eventPupil: {
      columns: ['verbose_name', 'CONTROLS'],
      titles: {verbose_name: 'Мероприятие', },
      sorted: {},
      render: parseControls(),
    },
  })

  return dryTableSchemas()[scope] || dryTableSchemas()['default']
}