import { observable } from 'mobx'
import service from './service'


class EventStore {
  @observable detail = {}

  @observable list = {
    data: [],
    total: 0,
    pages: 0,
  }

  async fetch(year) {
    try {
      this.detail = await service.fetch(year)
      return {
        status: 200,
        error: '',
      }
    } catch (error) {
      this.detail = {}
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }

  async fetchAll(page = 0) {
    try {
      const result = await service.fetchAll(page)
      if (!this.detail.year) {
        if (result.data.length > 0) {
          this.detail = result.data[0]
        }
      }
      return {
        status: 200,
        error: '',
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

export default EventStore
