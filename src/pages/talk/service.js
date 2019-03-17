import axios from 'axios'
import { API_ROOT, getCookie } from 'utils'


async function fetchAll(year) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.get(
    `${API_ROOT}/talk/year/${year}`,
    {
      headers: { 'X-CSRF-TOKEN': csrf },
    },
  )
  return response.data
}


export default {
  fetchAll,
}
