import React from 'react'

import { withAuthCheck } from '.'
import { MainLayout, LoginLayout } from '../Layouts'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default () => {
  const authContext = useSelector(state => state.authContext)
  return (
    <Router basename="/diary">
      <Route path="/muz" render={() =>
        withAuthCheck
          (authContext)
          (MainLayout) ()
      } />
      <Route path="/login" render={() =>
        withAuthCheck
          (authContext, true)
          (LoginLayout) ()
      } />
    </Router>
  )
}