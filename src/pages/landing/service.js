import { API_ROOT, axios, getCookie } from 'utils'


export default {
  send: async (data) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.post(
      `${API_ROOT}/landing/form`,
      data,
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },
}
