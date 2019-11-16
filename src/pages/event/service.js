import { rest } from 'utils'


export default {
  create: async (year) => {
    const response = await rest.post('/event', { year })
    return response.data
  },

  edit: async (year, data) => {
    const response = await rest.patch(`/event/${year}`, data)
    return response.data
  },

  fetch: async (year) => {
    const response = await rest.get(`/event/${year}`)
    return response.data
  },

  fetchAll: async () => {
    const response = await rest.get('/event')
    return response.data
  },
}
