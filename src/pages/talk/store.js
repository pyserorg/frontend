import { observable } from 'mobx'
import service from './service'


export default class TalkStore {
  @observable detail = {}

  @observable list = {
    data: [],
    total: 0,
    pages: 0,
  }

  async fetchAll(year) {
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
}
