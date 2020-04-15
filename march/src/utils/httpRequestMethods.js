export const httpRequest2API = ({
  dataSet='api',
  endpoint,
  method='GET',
  token,
  body
}) => {
  const request = {
    url: `${process.env.REACT_APP_URL}/${dataSet}/${endpoint ? endpoint + '/' : ''}`,
    options: {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    }
  }
  if (body) { request.options['body'] = JSON.stringify(body) }
  if (token) { request.options.headers['Authorization'] = `Token ${token}` }
  return request
}