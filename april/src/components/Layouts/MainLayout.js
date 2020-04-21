import React from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { BaseLayout, AuthIsBeingChecked } from '.'
import { Menu } from '../Navigation'
import { ContentRouter } from '../Routers'

export default () => {
  const authContextTrigger = useSelector(state => state.authContext.trigger)
  const layoutSchema = 
    authContextTrigger
      ? {
//        menu: <Menu />,
        content: <ContentRouter />
      }
      : {
        content: <AuthIsBeingChecked />
      }
  return (
    <Router basename="/diary/muz">
      <BaseLayout {...layoutSchema} />
      <Redirect to="/diary" />
    </Router>
  )
}