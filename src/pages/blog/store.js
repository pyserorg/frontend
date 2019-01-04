import { observable } from 'mobx'
import service from './service'


export default class BlogStore {
  @observable detail = {
    author: {},
  }

  @observable list = {
    data: [],
    total: 0,
    pages: 0,
  }

  async fetch(year, month, day, slug) {
    try {
      const result = await service.fetch(year, month, day, slug)
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

  async fetchAll(page = 0) {
    try {
      const result = await service.fetchAll(page)
      this.list.total = result.total
      this.list.pages = result.pages
      this.list.data = result.data
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

  async create(title) {
    try {
      const result = await service.create(title)
      this.list.total += 1
      this.list.data.push(result)
      return {
        status: 200,
        error: '',
        data: result,
      }
    } catch (error) {
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }

  async remove(post) {
    try {
      const result = await service.remove(post)
      this.list.data = this.list.data.filter(item => post.id !== item.id)
      if (this.detail.id === post.id) {
        this.detail = {}
      }
      return {
        status: 200,
        error: '',
        data: result,
      }
    } catch (error) {
      return {
        error: error.response.data.message,
        status: error.response.status,
      }
    }
  }

  async edit(post, data) {
    try {
      await service.edit(post, data)
      if (this.detail.id === post.id) {
        this.detail = { ...this.detail, ...data }
      }
      Object.keys(data).forEach(property => {
        post[property] = data[property]
      })
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
