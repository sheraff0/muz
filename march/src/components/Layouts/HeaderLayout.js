import React from 'react'
import { Redirect } from 'react-router-dom'
import { Col, Row } from 'antd'
import minamoto from '../../img/Sasa_Rindo.svg'

import { User } from '../Navigation'

export default () =>
  <Row>
    <Col onClick={() => <Redirect to="/tycoon/login" />} >
      <img 
        className="header-logo"
        src={minamoto} 
      />
    </Col>
    <Col flex="auto" className="header-title">
      <span className="title">Tycoon</span>
      <span className="subtitle">A database joystick</span>
    </Col>
    <Col span={7}>
      <User />
    </Col>
  </Row>