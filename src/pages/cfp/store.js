import { observable } from 'mobx'
import service from './service'


export default class CfPStore {
  @observable talk = {
    id: 0,
    description: '',
    duration: 30,
    published: false,
    start: new Date(),
    title: '',
    type: 'presentation',
  }

  @observable person = {
    id: 0,
    bio: '',
    email: '',
    facebook: '',
    firstName: '',
    lastName: '',
    twitter: '',
    password: '',
    passwordRepeat: '',
  }

  async get(id) {
    try {
      const result = await service.get(id)
      result.start = new Date(result.start)
      this.talk = result
      this.person = result.user
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

  async publish(published) {
    try {
      const result = await service.patch(this.talk.id, { published })
      result.start = new Date(result.start)
      this.talk = result
      this.person = result.user
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

  async startTime(time) {
    try {
      const year = time.getFullYear()
      const month = time.getMonth()
      const day = time.getDay()
      const hour = time.getHours()
      const minute = time.getMinutes()
      const second = time.getSeconds()
      const timeString = `${year}-${month}-${day}T${hour}:${minute}:${second}`
      const result = await service.patch(this.talk.id, { start: timeString })
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
