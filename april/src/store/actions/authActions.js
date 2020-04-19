// Only pivotal login actions showing the direction of login flow.
// Listened by Saga-middleware and processed thereafter.

export const authCheck = props => ({
  type: 'AUTH_CHECK',
  payload: props
})

export const logout = props => ({
  type: 'LOGOUT',
  payload: props
})
