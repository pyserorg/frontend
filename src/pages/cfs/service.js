import axios from 'axios'
import { API_ROOT, getCookie } from 'utils'


async function send() {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.get(
    `${API_ROOT}/cfs`,
    {
      headers: {
        'X-CSRF-TOKEN': csrf,
      },
    }
  )
  return response.data
}


export default {
  send,
}
