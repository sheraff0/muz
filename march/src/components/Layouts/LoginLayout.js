import React from 'react'
import { Row, Col } from 'antd'
import { LoginForm } from '../DataUI'
import BaseLayout from './BaseLayout'

export default () => {
  const layoutSchema = {
    content:
      <>
        <h1 className="page-header">Пожалуйста, подтвердите доступ к данным</h1>
        <Row>
          <Col xs={1} sm={2} md={3} lg={4} />
          <Col flex="auto">
            <LoginForm />
          </Col>
          <Col xs={3} sm={4} md={5} lg={6} />
        </Row>
      </>
  }
  return (
    <BaseLayout {...layoutSchema} />
  )
}