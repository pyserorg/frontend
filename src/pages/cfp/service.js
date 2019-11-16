import { API_ROOT, axios, getCookie } from 'utils'


export default {
  fetch: async (id) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.get(
      `${API_ROOT}/talk/${id}`,
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },

  fetchAll: async (year, page) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.get(
      `${API_ROOT}/talk/year/${year}`,
      {
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Page': page,
        },
      },
    )
    return response.data
  },

  patch: async (id, data) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.patch(
      `${API_ROOT}/talk/${id}`,
      data,
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },

  send: async (data) => {
    const csrf = getCookie('csrf_access_token')
    const response = await axios.post(
      `${API_ROOT}/cfp`,
      data,
      { headers: { 'X-CSRF-TOKEN': csrf } },
    )
    return response.data
  },
}
