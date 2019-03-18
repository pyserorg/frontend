import { observable } from 'mobx'
import service from './service'


export default class CfPStore {
  @observable talk = {
    id: 0,
    description: '',
    duration: 30,
    hall: 'presentations',
    published: false,
    title: '',
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

  @observable list = {
    data: [],
    page: 0,
    total: 0,
  }

  async get(id) {
    try {
      const result = await service.get(id)
      if (result.start) {
        result.start = new Date(result.start)
      } else {
        delete result.start
      }
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
      if (result.start) {
        result.start = new Date(result.start)
      } else {
        delete result.start
      }
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
      const talk = { ...this.talk }
      delete talk.start
      const result = await service.send(talk, this.person)
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

  async fetchAll(year = new Date().getFullYear(), page = 0) {
    try {
      const result = await service.fetchAll(year, page)
      result.data.forEach(talk => {
        if (talk.start) {
          talk.start = new Date(talk.start)
        } else {
          delete talk.start
        }
      })
      this.list = result
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

  async edit(id, data) {
    try {
      const result = await service.patch(id, data)
      if (result.start) {
        result.start = new Date(result.start)
      } else {
        delete result.start
      }
      if (this.talk.id === id) {
        this.talk = result
      }
      this.list.data.forEach((talk, index) => {
        if (talk.id === id) {
          this.list.data[index] = result
        }
      })
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
