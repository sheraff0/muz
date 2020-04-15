import React, { useEffect } from 'react'
import './App.css'

import { AppRouter } from './components/Routers'
import { authCheck } from './store/actions'
import { useDispatch } from 'react-redux'

import { withCookies } from 'react-cookie'

export default withCookies(props => {
  const dispatch = useDispatch()

  // Check for `token` cookie, store if exists...
  useEffect(() =>{
    dispatch(authCheck({ cookies: props.cookies }))
  }, [])
  
  return (
    <AppRouter />
  )
})
