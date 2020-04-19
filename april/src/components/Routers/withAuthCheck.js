import React from 'react'
import { Redirect } from 'react-router-dom'

export default ( authContext, loginRequest ) => Component => props => {
  console.log(authContext)
  return (
    <>
      { !loginRequest
        ? authContext.trigger && !authContext.token
          ? <Redirect to="/login" />
          : <Component {...props} />
        : authContext.trigger && authContext.token
          ? <Redirect to="/muz" />
          : <Component {...props} />
      }
    </>
  )
}