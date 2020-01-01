import { rest } from 'utils'


export default {
  announce: async (year) => {
    const response = await rest.post(`/talks/year/${year}/announce`, {})
    return response.data
  },

  edit: async (id, data) => {
    const response = await rest.patch(`/talks/${id}`, data)
    return response.data
  },

  fetch: async (id) => {
    const response = await rest.get(`/talks/${id}`)
    return response.data
  },

  fetchAll: async (year) => {
    const response = await rest.get(`/talks/year/${year}`)
    return response.data
  },

  fetchAllUser: async (year) => {
    const response = await rest.get(`/talks/year/${year}/user`)
    return response.data
  },

  fetchPublished: async (year) => {
    const response = await rest.get(`/talks/year/${year}/published`)
    return response.data
  },
}
