import React from 'react'
import { Redirect } from 'react-router-dom'
import { Col, Row } from 'antd'
import clef from '../../img/Treble_clef.svg'

import { User } from '../Navigation'

export default () =>
  <Row>
    <Col onClick={() => <Redirect to="/tycoon/login" />} >
      <img 
        className="header-logo"
        src={clef}
      />
    </Col>
    <Col flex="auto" className="header-title">
      <span className="title">Дневник</span>
      <span className="subtitle">музыкальная школа</span>
    </Col>
    <Col span={7}>
      <User />
    </Col>
  </Row>