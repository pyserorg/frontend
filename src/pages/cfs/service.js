export default {
  send: async () => {
    const response = await window.rest.get('/cfs')
    return response.data
  },
}
