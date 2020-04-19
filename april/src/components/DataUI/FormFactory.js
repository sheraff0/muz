import React from 'react'
import { Form, Button, Row } from 'antd'
import { inputFactory } from '.'

const defaultLayout = {
  labelCol: { xs: 7, md: 6 },
  wrapperCol: { xs: 14, md: 12 }
}

const defaultTailLayout = {
  wrapperCol: { offset: 6, span: 14 }
}

const defaultSubmit = {
  type: "primary",
  htmlType: "submit",
  text: "Сохранить"
}

const rulesFactory = field => {
  const rules = []
  if (!field.null) {
    rules.push({
      required: true, message: (field.label || field.verbose_name) + ' - обязательное поле!'
    })
  }
  return rules
}

export default ({
  scope, parent,
  fields={}, formData={},
  formHeader, layout=defaultLayout, tailLayout=defaultTailLayout,
  submitButton=defaultSubmit,
  ...props
}) => {
  const [form] = Form.useForm()
 
  const setValue = (field, value) => {
    form.setFieldsValue({ [field.name]: value })
  }

  return (
    <>
      { formHeader &&
        <Row style={{ marginBottom: ".5rem", fontSize: "1.1rem" }}>
          <span className="page-header">
            { formHeader.title || "Тут что-то интересное..." }:&nbsp;
            <span className={ "entry-name" + (!formHeader.entry ? " new-entry" : "")}>
              { formHeader?.entry || 'новая запись' }
            </span>
          </span>
        </Row>
      }
      <Form
        {...(layout || defaultLayout)}
        form={form}
        initialValues={formData}
        onFinish={props.onFinish} onFinishFailed={props.onFinishFailed}
        size={props.size || "large"}
        onValuesChange={changed => console.log(changed)}
      >
        { fields.map(field =>
          field.type !== 'AutoField' &&
            <Form.Item
              key={field.name}
              label={field.label || field.verbose_name}
              name={field.name}
              rules={rulesFactory(field)}
              valuePropName={field.type === 'BooleanField' ? "checked" : undefined}
            >
              { inputFactory(field, scope, parent, formData, setValue) }
            </Form.Item>
        )}
        <Form.Item key="submitButton" {...tailLayout}>
          <Button type={submitButton.type} htmlType={submitButton.htmlType}>
            {submitButton.text}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}