import axios from 'axios'
import { API_ROOT, getCookie } from 'utils'


async function fetchAll(page) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.get(
    `${API_ROOT}/users/volunteering`,
    {
      headers: {
        'X-CSRF-TOKEN': csrf,
        'X-Page': page,
      },
    },
  )
  return response.data
}


async function send(data) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.post(
    `${API_ROOT}/users/volunteering`,
    data,
    {
      headers: { 'X-CSRF-TOKEN': csrf },
    },
  )
  return response.data
}


async function count() {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.get(
    `${API_ROOT}/users/volunteering/count`,
    {
      headers: { 'X-CSRF-TOKEN': csrf },
    },
  )
  return response.data
}


export default {
  count,
  fetchAll,
  send,
}
