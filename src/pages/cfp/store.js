import { observable } from 'mobx'
import service from './service'


export default class CfPStore {
  @observable talk = {
    description: '',
    title: '',
    type: 'presentation',
    duration: 30,
  }

  @observable person = {
    bio: '',
    email: '',
    facebook: '',
    firstName: '',
    lastName: '',
    twitter: '',
    password: '',
    passwordRepeat: '',
  }

  async send() {
    try {
      const result = await service.send(
        this.talk,
        this.person,
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
