import { all, put, select, take, takeEvery } from 'redux-saga/effects'
import { httpRequest2API } from '../../utils'

// If no `credentials` form data passed, try to get
//      `user` & `token` for current session from cookies.
// If no cookies, dispatch 'LOGOUT' (leading to `logout` fuction below).

// With `credentials`, post request to auth API.
// If OK, set cookies and dispatch 'LOGGED_IN',
//      otherwise dispatch 'LOGOUT'.
function* authCheck({ payload }) {
  let cookies = payload.cookies
  let credentials = payload.credentials
  if (!credentials) {
    let token = cookies.get('auth-token')
    let user = cookies.get('auth-user')
    if (token && user) {
      yield put({ type: 'LOGGED_IN', payload: { token, user }})
    } else {
      yield put({ type: 'LOGOUT', payload: { cookies } })
    }
  } else {
    yield put({ type: 'CREATE_AUTHDATA', payload: httpRequest2API({
      dataSet: 'auth',
      method: 'POST',
      body: credentials
    }) })
    yield take('CREATE_AUTHDATA_SUCCEEDED')
    let authData = yield select(state => state.authData.CREATE.data)
    if (authData) {
      let token = authData?.token
      let user = credentials.username
      if (token && user) {
        yield put({ type: 'LOGGED_IN', payload: { token, user }})
        cookies.set('auth-token', token, { path: '/' })
        cookies.set('auth-user', user, { path: '/' })
      } else {
        yield put({ type: 'LOGOUT', payload: {cookies} })
      }
    }
  }
}

function* logout({ payload }) {
  console.log('Quitting...')
  yield put({ type: 'LOGIN_REQUIRED' })
  payload.cookies.remove('auth-token', { path: '/' })
  payload.cookies.remove('auth-user', { path: '/' })
}

export function* watchAuth() {
  yield all([
    takeEvery('AUTH_CHECK', authCheck),
    takeEvery('LOGOUT', logout)
  ])
}
