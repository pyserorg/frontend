import { observable } from 'mobx'
import service from './service'


export default class GalleryStore {
  @observable list = {
    files: {
      data: [],
      'total': 0,
      'pages': 0,
    },
    name: '',
    pages: 0,
    prefix: '',
    total: 0,
  }

  async fetch(albumName, year = null, page = 0) {
    try {
      const result = await service.fetch(albumName, year, page)
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

  async fetchAggregate(albumName, year = null, page = 0) {
    try {
      const result = await service.fetch(albumName, year, page)
      this.list.files = this.list.files.concat(result.files)
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
