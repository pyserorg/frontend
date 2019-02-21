import axios from 'axios'
import { API_ROOT, getCookie } from 'utils'


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


export default {
  send,
}
