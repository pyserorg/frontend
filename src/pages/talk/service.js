import { API_ROOT, axios, getCookie } from 'utils'


export default {
  announce: async (year) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.post(
      `${API_ROOT}/talk/year/${year}/announce`,
      {},
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },

  edit: async (id, data) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.patch(
      `${API_ROOT}/talk/${id}`,
      data,
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },

  fetch: async (id) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.get(
      `${API_ROOT}/talk/${id}`,
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },

  fetchAll: async (year) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.get(
      `${API_ROOT}/talk/year/${year}`,
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },

  fetchAllUser: async (year) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.get(
      `${API_ROOT}/talk/year/${year}/user`,
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },

  fetchPublished: async (year) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.get(
      `${API_ROOT}/talk/year/${year}/published`,
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },
}
