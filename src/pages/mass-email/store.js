import { observable } from 'mobx'
import service from './service'


export default class EmailStore {
  @observable detail = {
    from: 'office',
    message: '',
    subject: '',
    to: 'all',
  }

  async send() {
    try {
      await service.send(
        this.detail.from,
        this.detail.to,
        this.detail.subject,
        this.detail.message,
      )
      this.detail.message = ''
      this.detail.subject = ''
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
