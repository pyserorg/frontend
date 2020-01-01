import { rest } from 'utils'


export default {
  create: async (year) => {
    const response = await rest.post('/events', { year })
    return response.data
  },

  edit: async (year, data) => {
    const response = await rest.patch(`/events/${year}`, data)
    return response.data
  },

  fetch: async (year) => {
    const response = await rest.get(`/events/${year}`)
    return response.data
  },

  fetchAll: async () => {
    const response = await rest.get('/events')
    return response.data
  },
}
