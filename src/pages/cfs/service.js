import { rest } from 'utils'


export default {
  send: async () => {
    const response = await rest.get('/cfs')
    return response.data
  },
}
