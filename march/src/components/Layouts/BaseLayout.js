import React from 'react'
import { Layout } from 'antd'
import HeaderLayout from './HeaderLayout'

const { Sider, Header, Content, Footer } = Layout

export default props =>
  <Layout>
    <Header>{ props.header || <HeaderLayout />}</Header>
      <Layout>
        { !props.sider ? null
          : <Sider theme="light" breakpoint="md">{props.sider}</Sider>
        }
        <Content>{ props.content || "Content" }</Content>
      </Layout>
    <Footer>{ props.footer || <span>&copy; ООО &laquo;Газстройпром&raquo;, 2020</span> }</Footer>
  </Layout>