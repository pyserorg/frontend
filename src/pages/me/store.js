import { observable } from 'mobx'
import service from './service'


class MeStore {
  @observable detail = {
    admin: false,
  }

  async fetch() {
    try {
      const result = await service.fetch()
      this.detail = result
      return {
        status: 200,
        error: '',
        result,
      }
    } catch (error) {
      this.detail = {}
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }

  async edit(data) {
    try {
      const result = await service.edit(data)
      this.detail = result
      return {
        status: 200,
        error: '',
        result,
      }
    } catch (error) {
      this.detail = {}
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }
}

export default MeStore
