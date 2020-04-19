import React from 'react'
import { Menu } from 'antd'
import menuSchema from './menuSchema'

import { Link } from 'react-router-dom'

const { SubMenu } = Menu

const parseMenuItem = (item) =>
  item.type === 'sub'
  ? <SubMenu key={item.key} title={item.title}>
    {item.items.map(item =>
      parseMenuItem(item)
    )}
  </SubMenu>
  : item.type === 'gr'
    ? <Menu.ItemGroup key={item.key} title={item.title}>
      {item.items.map(item =>
        parseMenuItem(item)
      )}
    </Menu.ItemGroup>
    : <Menu.Item key={item.key}><Link to={item.link || ""}>{item.title}</Link></Menu.Item>

export default () =>
  <Menu
    onClick={e => console.log(e)}
    defaultOpenKeys={['sub1']}
    defaultSelectedKeys={['1']}
    mode="horizontal"
  >
    {menuSchema().map(item =>
      parseMenuItem(item)
    )}
  </Menu>