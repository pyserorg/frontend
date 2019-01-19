import { observable } from 'mobx'
import service from './service'


export default class CfSStore {
  @observable focused = ''

  @observable email = ''

  @observable organization = ''

  @observable message = ''

  @observable detail = {}

  @observable list = {
    data: [],
    total: 0,
    pages: 0,
  }

  async send() {
    try {
      const result = await service.send(
        this.email,
        this.organization,
        this.message,
      )
      return {
        error: '',
        status: 200,
        result,
      }
    } catch (error) {
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }

  async fetch(id) {
    try {
      const result = await service.fetch(id)
      this.detail = result
      return {
        error: '',
        status: 200,
        result,
      }
    } catch (error) {
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }

  async fetchAll(year, page = 0) {
    try {
      const result = await service.fetchAll(year, page)
      this.list = result
      return {
        error: '',
        status: 200,
        result,
      }
    } catch (error) {
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }
}
