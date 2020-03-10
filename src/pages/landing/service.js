export default {
  send: async (data) => {
    const response = await window.rest.post('/landing/form', data)
    return response.data
  },
}
