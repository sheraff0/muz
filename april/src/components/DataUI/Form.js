import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { FormFactory, RelatedTabs } from '.'
import { scopes } from '../../store'
import { dataItem } from '../../utils'

export default ({ 
  scope, parent, api_function,
  id,
  onFinish,
  ...props 
}) => {
  const model = scopes()[scope].modelName
  const meta = useSelector(state => state.meta.LIST.data?.[model])
  const data = useSelector(state => state[
    props.proxyScope || scope
  ][api_function].data)

  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  
  // FORM DATA PREPARATION
  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  
  const rawFormData = (data && id) 
    ? dataItem(data, id)
    : parent?.id && { 
        [parent.field_name]: parent.id
      }

  const formHeader = {
    title: meta?.model_verbose_name,
    entry: rawFormData?.verbose_name || rawFormData?.full_name,
  }

  const fields  =
    meta?.fields &&
      Object.entries(meta?.fields).map(entry => ({
        name: entry[0],
        type: entry[1].type,
        ...entry[1].details
      }))

  const momentFields = Object.fromEntries(
    fields?.filter(field => ['DateField', 'TimeField'].includes(field.type)).map(field => {
      const format = field.type === 'DateField' ? 'YYYY-MM-DD' : 'HH:mm'
      return ([
        field.name, 
        rawFormData?.[field.name] && 
          moment(rawFormData[field.name], format)
      ])
    })
  )

  const formData = {
    ...rawFormData,
    ...momentFields
  }
  console.log(formData)

  const related = meta?.related_models

  return (
    <>
      <FormFactory
        formHeader={formHeader}
        scope={scope} parent={parent}
        fields={fields} formData={formData}
        onFinish={onFinish}
        {...props} 
      />
      { (id && related) &&
        <RelatedTabs 
          related={related} 
          id={id}
        />
      }
    </>
  )
}