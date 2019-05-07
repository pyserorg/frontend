import { observable } from 'mobx'
import service from './service'


export default class UserStore {
  @observable detail = {
    active: false,
    admin: false,
    firstName: '',
    lastName: '',
    volunteer: false,
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
      this.list = result
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

  async edit(id, data) {
    try {
      const numId = Number(id)
      const result = await service.edit(numId, data)
      if (this.detail.id === numId) {
        this.detail = result
      }
      for (let i = 0; i < this.list.data.length; i += 1) {
        if (this.list.data[i].id === id) {
          this.list.data[i] = result
        }
      }
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
