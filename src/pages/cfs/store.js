import { observable } from 'mobx'
import service from './service'


export default class CfSStore {
  @observable focused = ''

  @observable email = ''

  @observable organization = ''

  @observable message = ''

  async send() {
    try {
      const result = await service.send(
        this.email,
        this.organisation,
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
}
