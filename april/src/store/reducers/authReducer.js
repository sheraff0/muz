export default (state = { trigger: false }, { type, payload }) => {
  switch (type) {
    case "LOGGED_IN":
      console.log(type, payload)
      return {
        ...state,
        trigger: true,
        token: payload.token,
        user: payload.user
      }
    case "LOGIN_REQUIRED":
      console.log(type, payload)
      return {
        ...state,
        trigger: true,
        token: null,
        user: null
      }
    default:
      return state
  }
}
