import axios from 'axios'
import { API_ROOT, getCookie } from 'utils'


async function fetch(id) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.get(
    `${API_ROOT}/cfs/detail/${id}`,
    {
      headers: { 'X-CSRF-TOKEN': csrf },
    },
  )
  return response.data
}


async function fetchAll(year, page) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.get(
    `${API_ROOT}/cfs/${year}`,
    {
      headers: {
        'X-CSRF-TOKEN': csrf,
        'X-Page': page,
      },
    },
  )
  return response.data
}


async function send(email, organization, message) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.post(
    `${API_ROOT}/cfs`,
    {
      email,
      organization,
      message,
    },
    {
      headers: { 'X-CSRF-TOKEN': csrf },
    },
  )
  return response.data
}


export default {
  fetch,
  fetchAll,
  send,
}
