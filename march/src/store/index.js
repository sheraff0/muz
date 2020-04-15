import scopes, { scopeFromModel } from './scopes'
import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

export {
  scopes, scopeFromModel,
  sagaMiddleware,
  store,
}
