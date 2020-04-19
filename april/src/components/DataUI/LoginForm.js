import React from 'react'
import { withCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { FormFactory } from '.'

import { authCheck } from '../../store/actions'

const layout = {
  labelCol: { xs: 8, md: 8 },
  wrapperCol: { xs: 14, md: 12 }
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 14 }
}

const loginFields = [
  { label: 'Имя пользователя', name: 'username', type: 'CharField', },
  { label: 'Пароль', name: 'password', type: 'Password', },
]

const submitLogin = {
  type: "primary",
  htmlType: "submit",
  text: "Войти"
}

const LoginForm = props => {
  const dispatch = useDispatch()
  const attemptLogin = credentials => {
    dispatch(authCheck({
      cookies: props.cookies,
      credentials: credentials
    }))
  }
  const onFinish = credentials => {
    attemptLogin(credentials)
  }
  return (
    <FormFactory
      fields={loginFields}
      layout={layout} tailLayout={tailLayout}
      submitButton={submitLogin}
      onFinish={onFinish}
    />
  )
}

export default withCookies(LoginForm)