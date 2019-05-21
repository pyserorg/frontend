import { observable } from 'mobx'
import service from './service'


export default class LandingStore {
  @observable organizer = {
    fromAddress: '',
    subject: '',
    message: '',
  }

  async send() {
    try {
      await service.send(this.organizer)
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
