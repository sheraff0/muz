import React from 'react'
import { TimePicker } from 'antd'

const timeFormat = 'HH:mm'

export default ({
  ...props
}) =>
  <TimePicker
    format={timeFormat}
    popupStyle={{ display: "none" }} 
    {...props} 
  />