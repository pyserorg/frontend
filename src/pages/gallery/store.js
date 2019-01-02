import { observable } from 'mobx'
import service from './service'


export default class GalleryStore {
  @observable detail = {
    id: 0,
    name: '',
    files: [],
    pages: 1,
    total: 0,
    prefix: '',
  }

  @observable list = {
    data: [],
    total: 0,
    pages: 0,
  }

  async fetch(albumName, year = null, page = 0) {
    try {
      const result = await service.fetch(albumName, year, page)
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
}
