import { toCamelCase, toPascalName } from '../utils'

// Model-based scopes of data
// used for Redux & Saga factory-functions.

// Set correct `modelName` property
// if model names and API endpoints do not match!

const pathsList = [
  // Paths to model-bound API endpoints
  {path: 'pupil'},
  {path: 'academic_year'},
  {path: 'pupil_form'},
  {path: 'event'},
  {path: 'event_pupil'},
  {path: 'task'},
  {path: 'diary'},
  // `authData` for tokens retrieved from API
  // Current session state (i.e. token & username collected from cookies)
  // is reduced to `authContext`
  {path: 'auth', id: 'authData', index: 'AUTHDATA'},
  {path: 'meta'},
]

 const scopes = () => {
  const scopesEntries = pathsList.map(x => [
    x.id || toCamelCase(x.path), {
      path: x.path,
      index: x.index || x.path.toUpperCase(),
      modelName: x.modelName || toPascalName(x.path),
    }])
  return Object.fromEntries(scopesEntries)
}

export default scopes

export const scopeFromModel = model =>
  Object.entries(scopes())
    .filter(entry => entry[1].modelName === model)
    ?.[0]?.[0]
