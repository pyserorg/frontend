import axios from 'axios'
import { API_ROOT, getCookie } from 'utils'


async function fetchAll(year, page) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.get(
    `${API_ROOT}/talk/year/${year}`,
    {
      headers: {
        'X-CSRF-TOKEN': csrf,
        'X-Page': page,
      },
    },
  )
  return response.data
}


async function get(id) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.get(
    `${API_ROOT}/talk/${id}`,
    {
      headers: { 'X-CSRF-TOKEN': csrf },
    },
  )
  return response.data
}


async function send(talk, person) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.post(
    `${API_ROOT}/cfp`,
    {
      talk,
      person,
    },
    {
      headers: { 'X-CSRF-TOKEN': csrf },
    },
  )
  return response.data
}


async function patch(id, data) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.patch(
    `${API_ROOT}/talk/${id}`,
    data,
    {
      headers: { 'X-CSRF-TOKEN': csrf },
    },
  )
  return response.data
}


export default {
  fetchAll,
  get,
  patch,
  send,
}
