import { rest } from 'utils'


export default {
  fetch: async (id) => {
    const response = await rest.get(`/talk/${id}`)
    return response.data
  },

  fetchAll: async (year, page) => {
    const response = await rest.get(
      `/talk/year/${year}`,
      { headers: { 'X-Page': page } },
    )
    return response.data
  },

  patch: async (id, data) => {
    const response = await rest.patch(`/talk/${id}`, data)
    return response.data
  },

  send: async (data) => {
    const response = await rest.post('/cfp', data)
    return response.data
  },
}
