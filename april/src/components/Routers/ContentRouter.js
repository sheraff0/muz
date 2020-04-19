import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { contentRoutes } from '.'

import { gunDogActions } from '../../store/actions'
import { httpRequest2API } from '../../utils'

export default () => {
  const dispatch = useDispatch()
  const token = useSelector(state =>  state.authContext.token)

  // Fetch API meta data, store if exists
  const getMetaData = () => {
    dispatch(gunDogActions.meta.LIST(httpRequest2API({
      dataSet: 'meta',
      token
    })))
  }
  useEffect(() => {
    getMetaData()
  }, [])

  return (
    <Switch>
      { contentRoutes().map(route =>
        <Route key={route.path} path={route.path} render={() => route.render()} />
      )}
    </Switch>
  )
}