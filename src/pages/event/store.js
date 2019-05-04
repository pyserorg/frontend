import { observable } from 'mobx'
import service from './service'


export default class EventStore {
  @observable detail = {}

  @observable list = {
    data: [],
    total: 0,
    pages: 0,
  }

  async fetch(year) {
    try {
      const result = await service.fetch(year)
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

  async fetchAll(page = 0) {
    try {
      const result = await service.fetchAll(page)
      if (!this.detail.year) {
        if (result.data.length > 0) {
          [this.detail] = result.data
        }
      }
      this.list = result
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

  async create(year) {
    try {
      const result = await service.create(year)
      this.detail = result
      this.list.data.push(result)
      this.list.total += 1
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

  async edit(year, data) {
    try {
      const result = await service.edit(year, data)
      this.detail = result
      this.list.data.push(result)
      this.list.total += 1
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
