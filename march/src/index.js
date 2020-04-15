import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { ConfigProvider } from 'antd'
import ruRU from 'antd/es/locale/ru_RU'

import { CookiesProvider } from 'react-cookie'

import { Provider } from 'react-redux'
import { store, sagaMiddleware } from './store'
import rootSaga from './store/sagas'

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <ConfigProvider locale={ruRU}>
        <App />
      </ConfigProvider>
    </Provider>
  </CookiesProvider>

  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
