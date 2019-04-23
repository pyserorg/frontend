import axios from 'axios'
import { API_ROOT, getCookie } from 'utils'


async function fetch(id) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.get(
    `${API_ROOT}/users/${id}`,
    {
      headers: { 'X-CSRF-TOKEN': csrf },
    },
  )
  return response.data
}


async function fetchAll(page) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.get(
    `${API_ROOT}/users`,
    {
      headers: {
        'X-CSRF-TOKEN': csrf,
        'X-Page': page,
      },
    },
  )
  return response.data
}


async function edit(id, data) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.patch(
    `${API_ROOT}/users/${id}`,
    data,
    {
      headers: { 'X-CSRF-TOKEN': csrf },
    },
  )
  return response.data
}


export default {
  fetch,
  fetchAll,
  edit,
}
