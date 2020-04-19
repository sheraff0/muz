import { combineReducers } from 'redux'
import { scopes } from '..'

export const API_FUNCTIONS = [  // derived from DRF schema definitions
  'LIST',
  'SHORTLIST', // custom function
  'RETRIEVE',
  'CREATE',
  'UPDATE',
  'PARTIAL_UPDATE',
  'PARTIAL_LIST',
  'DESTROY',
  'DESTROY_LIST',  // custom function
]

// 2-D array of API fetch async actions, dispatched from components and Sagas
// reduced to respective store structure
const gunDogReducerFor = index => combineReducers(
  Object.fromEntries(
    API_FUNCTIONS.map(api_function =>
      gunDogReducerForApiFunction(index, api_function))
  )
)

// ... multiplying by scope index dimension
const gunDogReducerForApiFunction = (index, api_function) => [
  api_function,
  (state = { trigger: false }, { type, payload }) => {
    switch (type) {
      case api_function + '_' + index + '_STARTED':
        console.log(type, payload)
        return {
          ...state,
          trigger: true,
          loaded: false,
//          data: null,
          error: null,
          selected: null
        }
      case api_function + '_' + index + '_SUCCEEDED':
        console.log(type, payload, state.data)
        return {
          ...state,
          trigger: false,
          loaded: true,
          data: api_function === 'RETRIEVE'  // add & replace retrieved single items
            ? (state.data || []).filter(item => item.id !== payload.id)
              .concat([payload])
            : payload,  // rewrite data store completely for mass actions
          error: null,
          selected: null
        }
      case api_function + '_' + index + '_FAILED':
        console.log(type, payload)
        return {
          trigger: false,
          loaded: true,
          data: null,
          error: payload,
          selected: null
        }
      case api_function + '_' + index + '_CLEARED':
        console.log(type, payload)
        return {
          trigger: false,
        }
      default:
        return state
    }
  }
]

export default () =>
  Object.fromEntries(
    Object.keys(scopes()).map(k =>
      [k, gunDogReducerFor(scopes()[k].index)]
  ))