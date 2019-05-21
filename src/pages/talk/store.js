import { observable } from 'mobx'
import service from './service'


export default class TalkStore {
  @observable detail = {
    user: {
    },
  }

  @observable list = {
    data: [],
    total: 0,
    pages: 0,
  }

  async fetch(id) {
    try {
      const result = await service.fetch(id)
      this.detail = result
      return {
        status: 200,
        error: '',
      }
    } catch (error) {
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }

  async fetchAll(year = new Date().getFullYear()) {
    try {
      const result = await service.fetchAll(year)
      this.list = result
      return {
        status: 200,
        error: '',
      }
    } catch (error) {
      this.list.total = 0
      this.list.pages = 0
      this.list.data = []
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }

  async fetchAllUser(year = new Date().getFullYear()) {
    try {
      const result = await service.fetchAllUser(year)
      this.list = result
      return {
        status: 200,
        error: '',
      }
    } catch (error) {
      this.list.total = 0
      this.list.pages = 0
      this.list.data = []
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }

  async fetchPublished(year) {
    try {
      const result = await service.fetchPublished(year)
      this.list = result
      return {
        status: 200,
        error: '',
      }
    } catch (error) {
      this.list.total = 0
      this.list.pages = 0
      this.list.data = []
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }

  async edit(data) {
    try {
      const result = await service.edit(this.detail.id, data)
      this.detail = result
      return {
        status: 200,
        error: '',
      }
    } catch (error) {
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }

  async announce(year) {
    try {
      await service.announce(year)
      return {
        status: 200,
        error: '',
      }
    } catch (error) {
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }
}
