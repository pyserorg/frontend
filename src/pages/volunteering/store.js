import { observable } from 'mobx'
import service from './service'


export default class VolunteersStore {
  @observable detail = {
    email: '',
    firstName: '',
    lastName: '',
  }

  @observable list = {
    data: [],
    pages: 0,
    total: 0,
  }

  async fetchAll(page) {
    try {
      const result = await service.fetchAll(page)
      this.list = result
      return {
        error: '',
        status: 200,
      }
    } catch (error) {
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }

  async send() {
    try {
      await service.send(this.detail)
      this.detail = {
        email: '',
        firstName: '',
        lastName: '',
      }
      return {
        error: '',
        status: 200,
      }
    } catch (error) {
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }
}
