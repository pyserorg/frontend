import axios from 'axios'
import { API_ROOT, getCookie } from 'utils'


async function send(from, to, subject, message) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.post(
    `${API_ROOT}/email`,
    {
      fromAddress: from,
      to,
      subject,
      message,
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
