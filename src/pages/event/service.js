export default {
  create: async (year) => {
    const response = await window.rest.post('/events', { year })
    return response.data
  },

  edit: async (year, data) => {
    const response = await window.rest.patch(`/events/${year}`, data)
    return response.data
  },

  fetch: async (year) => {
    const response = await window.rest.get(`/events/${year}`)
    return response.data
  },

  fetchAll: async () => {
    const response = await window.rest.get('/events')
    return response.data
  },
}
