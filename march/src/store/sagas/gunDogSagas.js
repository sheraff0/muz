import { call, debounce, put } from 'redux-saga/effects'
import { scopes } from '..'
import { API_FUNCTIONS } from '../reducers'

// Basic built-in `fetch` functionality
async function fetchData(props) {
  const res = await fetch(...props)
  return await res.json()
}

// Async API-fetch actions set, results yielded to Reducers
const gunDog = (index, api_function) => function* ({ payload }) {
  console.log(index, api_function, payload)
  yield put({ type: api_function + '_' + index + "_STARTED" })
  try {
    const response = yield call(fetchData, [payload.url, payload.options])
    yield put({ type: api_function + '_' + index + "_SUCCEEDED", payload: response })

  } catch(error) {
    yield put({ type: api_function + '_' + index + "_FAILED", payload: error })
  }
}

// Initial `FETCH` command listeners set.
// Array passed to rootSaga
export const watchGunDogs =
  Object.keys(scopes()).map(k => {
    const index = scopes()[k].index
    return (
      API_FUNCTIONS.map(api_function => {
        const delay = (k === 'kladr' && api_function == 'LIST')
          ? 1200 : 300
        return function* () {
          yield debounce(
            delay,
            api_function + '_' + index,
            gunDog(index, api_function)
          )
        }
      })
    )
  })
