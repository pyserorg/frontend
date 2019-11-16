import { API_ROOT, axios, getCookie } from 'utils'


export default {
  send: async () => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.get(
      `${API_ROOT}/cfs`,
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },
}
