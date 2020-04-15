import { scopes } from '..'
import { API_FUNCTIONS } from '../reducers'

// 2D-array of API fetch calls dispatched to Sagas
const gunDogActionsFor = index =>
  Object.fromEntries(
    API_FUNCTIONS.map(api_function =>
      gunDogActionsForApiFunctions(index, api_function)
    )
  )

// ... multiplying by scope index dimension
const gunDogActionsForApiFunctions = (index, api_function) => [
  api_function,
  payload => ({
    type: api_function + '_' + index,
    payload: payload
  })
]

export const gunDogActions =
  Object.fromEntries(
    Object.keys(scopes()).map(k =>
      [k, gunDogActionsFor(scopes()[k].index)]
  ))
