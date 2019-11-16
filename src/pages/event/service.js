import { API_ROOT, axios, getCookie } from 'utils'


export default {
  create: async (year) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.post(
      `${API_ROOT}/event`,
      { year },
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },

  edit: async (year, data) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.patch(
      `${API_ROOT}/event/${year}`,
      data,
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },

  fetch: async (year) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.get(
      `${API_ROOT}/event/${year}`,
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },

  fetchAll: async () => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.get(
      `${API_ROOT}/event`,
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },
}
