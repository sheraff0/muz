import React from 'react'
import { Layout } from 'antd'
import HeaderLayout from './HeaderLayout'

const { Header, Content, Footer } = Layout

export default props =>
  <Layout>
    <Header>{ props.header || <HeaderLayout />}</Header>
    { props.menu }
    <Content>{ props.content || "Content" }</Content>
    <Footer>{ props.footer || <span>Класс деревянных духовых инструментов</span> }</Footer>
  </Layout>