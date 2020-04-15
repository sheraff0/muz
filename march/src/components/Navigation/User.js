import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/actions'

import { withCookies } from 'react-cookie'

const User = props => {
  const user = useSelector(state => !state.authContext ? null
		: state.authContext.user || null)
	const dispatch = useDispatch()
	const handleLogout = () => {
		dispatch(logout({ cookies: props.cookies }))
	}
  return (
    !user ? null
    : <span className="header-user">
        <span className="username">{user}</span>
        <span className="logout" onClick={handleLogout}>
          Выйти
        </span>
      </span>
  )
}

export default withCookies(User)