import ax from 'axios'


export const API_ROOT = '/api/v0'


export const rest = ax.create({
  baseURL: API_ROOT,
  withCredentials: true,
})

rest.interceptors.request.use(
  (config) => {
    const csrfType = config.url === '/auth/refresh'
      ? getCookie('csrf_refresh_token')
      : getCookie('csrf_access_token')
    const csrf = getCookie(csrfType)
    config.headers.withCredentials = true
    if (csrf) {
      config.headers['X-CSRF-TOKEN'] = csrf
    }
    return config
  },

  (err) => {
    return Promise.reject(err)
  },
)


export const getCookie = (name) => {
  var value = "; " + document.cookie
  var parts = value.split("; " + name + "=")
  if (parts.length === 2) return parts.pop().split(";").shift()
}


export const errors = (response) => {
  const data = response.response ? response.response.data : {}
  data.message = response.message ? response.message : data.status
  if (data.errors){
    Object.getOwnPropertyNames(data.errors).forEach(property => {
      if (property !== 'message') {
        data.errors[property] = data.errors[property].join(' ')
      }
    })
  }
  return data
}
