import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { BaseLayout, AuthIsBeingChecked } from '.'
import { Menu } from '../Navigation'
import { ContentRouter } from '../Routers'

export default () => {
  const authContextTrigger = useSelector(state => state.authContext.trigger)
  const layoutSchema = 
    authContextTrigger
      ? {
        sider: <Menu />,
        content: <ContentRouter />
      }
      : {
        content: <AuthIsBeingChecked />
      }
  return (
    <Router basename="/tycoon/muz">
      <BaseLayout {...layoutSchema} />
    </Router>
  )
}