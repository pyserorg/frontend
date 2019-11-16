import ax from 'axios'


export const API_ROOT = '/api/v0'
export const axios = ax.create({ withCredentials: true })


export function getCookie(name) {
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
