import { combineReducers } from 'redux'
import gunDogReducers from './gunDogReducers'
import authReducer from './authReducer'
import { API_FUNCTIONS } from './gunDogReducers'

const rootReducer = combineReducers({
  // Data store organized in `scope` -> `API_FUNCTION` hierarchy
  ...gunDogReducers(),

  // Current user & token obtained once from cookies on session start
  // or as a result of `auth` API call.
  authContext: authReducer
  // Token retrieval from API is managed through `authData` scope (in `gunDogReducers`)
})

export {
  rootReducer,
  API_FUNCTIONS,
}