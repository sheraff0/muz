import React from 'react'
import { Input, InputNumber, 
    Checkbox } from 'antd'
import { ForeignKeySelector } from '.'
import { DatePicker, TimePicker, Select } from '../Controls'
const { TextArea } = Input

// Returns properly formatted input element
// corresponding to field type
export default (field, scope, parent, formData, setValue) => {
  const props = { 
    placeholder: field.label || field.verbose_name, 
    name: field.name,
    defaultValue: field.default,
    disabled: (scope === 'location' && field.name !== 'full_name') ||
      (parent?.field_name === field.name),
    allowClear: true,
  }
  const hasChoices = () =>
    Object.keys(field.choices || {}).length > 0

  let InputComponent
  switch (field.type) {
    case 'Password':
      InputComponent = props => <Input.Password {...props} />; break
    case 'CharField':
      InputComponent = props => {
        const lines = Math.floor((field.max_length || 0) / 70) + 1
        return (lines < 2
          ? <Input type="text" {...props} />
          : <TextArea autoSize={{minRows: 2, maxRows: 8}} {...props} />
        )
      }; break
    case 'PositiveIntegerField':
    case 'SmallIntegerField':
      InputComponent = props => !hasChoices()
        ? <InputNumber {...props} />
        : <Select
            listData={field.choices}
            {...props}
          />
      break
    case 'FloatField':
      InputComponent = props => <InputNumber step={0.1} {...props} />; break
    case 'BooleanField':
      InputComponent = props => <Checkbox {...props.name} />; break
    case 'DateField':
      InputComponent = props => <DatePicker {...props} />; break
    case 'TimeField':
      InputComponent = props => <TimePicker {...props} />; break
    case 'ForeignKey':
    case 'OneToOneField':
    case 'ManyToManyField':
      InputComponent = props => 
        <ForeignKeySelector 
          field={field}
          parentFormData={{ scope: scope, data: formData }}
          setValue={setValue}
          {...props} />
      break
    default:
      props['disabled'] = true
      InputComponent = props => <Input {...props} />
  }
  return InputComponent(props)
}