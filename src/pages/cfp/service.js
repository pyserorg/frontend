export default {
  fetch: async (id) => {
    const response = await window.rest.get(`/talks/${id}`)
    return response.data
  },

  fetchAll: async (year, page) => {
    const response = await window.rest.get(
      `/talks/year/${year}`,
      { headers: { 'X-Page': page } },
    )
    return response.data
  },

  patch: async (id, data) => {
    const response = await window.rest.patch(`/talks/${id}`, data)
    return response.data
  },

  send: async (data) => {
    const response = await window.rest.post('/cfp', data)
    return response.data
  },
}
