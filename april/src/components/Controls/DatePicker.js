import React from 'react'
import { DatePicker } from 'antd'

const dateFormatList = () => [
  'DD.MM.YYYY',
  'D.M.YYYY', 'D/M/YYYY', 'D-M-YYYY',
  'D.M.YY', 'D/M/YY', 'D-M-YY',
  'YYYY-MM-DD', 'YYYY-M-D', 
]

export default ({
  ...props
}) =>
  <DatePicker 
    format={dateFormatList()} 
    popupStyle={{ display: "none" }} 
    {...props} 
  />