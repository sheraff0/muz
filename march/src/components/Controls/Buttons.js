import React from 'react'
import { Button } from 'antd'

const ControlButton = ({ text, type, ...props }) =>
  <Button
    size={props.size || "small"} 
    className={`control-button ${type}-button ${props.disabled ? "disabled-button" : ''}`}
    {...props}
  >
    {text}
  </Button>

export const CreateButton = ({ text, ...props }) =>
  <ControlButton type="create" text={text || "Создать"} {...props} />

export const EditButton = ({ text, ...props }) =>
  <ControlButton type="edit" text={text || "Изменить"} {...props} />

export const DeleteButton = ({ text, ...props }) =>
  <ControlButton type="delete" text={text || "Удалить"} {...props} />