import { rest } from 'utils'


export default {
  announce: async (year) => {
    const response = await rest.post(`/talk/year/${year}/announce`, {})
    return response.data
  },

  edit: async (id, data) => {
    const response = await rest.patch(`/talk/${id}`, data)
    return response.data
  },

  fetch: async (id) => {
    const response = await rest.get(`/talk/${id}`)
    return response.data
  },

  fetchAll: async (year) => {
    const response = await rest.get(`/talk/year/${year}`)
    return response.data
  },

  fetchAllUser: async (year) => {
    const response = await rest.get(`/talk/year/${year}/user`)
    return response.data
  },

  fetchPublished: async (year) => {
    const response = await rest.get(`/talk/year/${year}/published`)
    return response.data
  },
}
