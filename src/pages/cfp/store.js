import service from './service'


export default class CfPStore {
  constructor(detail, list) {
    this.detail = detail[0]
    this.setDetail = detail[1]
    this.list = list[0]
    this.setList = list[1]
  }

  fetch = async (id) => {
    try {
      const response = await service.fetch(id)
      if (response.start) {
        response.start = new Date(response.start)
      } else {
        delete response.start
      }
      const data = {
        ...response,
        ok: true,
      }
      this.setDetail(data)
      return data
    } catch (error) {
      const data = {
        ...error,
        ok: false,
      }
      return data
    }
  }

  publish = async (published) => {
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

  startTime = async (time) => {
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

  send = async (data) => {
    try {
      const result = await service.send(data)
      return {
        ok: true,
        ...result,
      }
    } catch (error) {
      return {
        ok: false,
        ...error,
      }
    }
  }

  fetchAll = async (year = new Date().getFullYear(), page = 0) => {
    try {
      const response = await service.fetchAll(year, page)
      response.data.forEach(talk => {
        if (talk.start) {
          talk.start = new Date(talk.start)
        } else {
          delete talk.start
        }
      })
      const data = {
        ok: true,
        ...response,
      }
      this.setList(data)
      return data
    } catch (error) {
      const data = {
        ok: false,
        error: error.response.data.message,
        ...this.list,
      }
      this.setList(data)
      return data
    }
  }

  edit = async (id, data) => {
    try {
      const response = await service.patch(id, data)
      if (response.start) {
        response.start = new Date(response.start)
      } else {
        delete response.start
      }
      const result = {
        ok: true,
        ...response,
      }
      if (this.detail.id === id) {
        this.setDetail(result)
      }
      const newList = {
        ...this.list,
        data: [ ...this.list.data ],
      }
      newList.data.forEach((talk, index) => {
        if (talk.id === id) {
          newList.data[index] = response
        }
      })
      this.setList(newList)
      return result
    } catch (error) {
      const result = {
        ok: false,
        ...error,
      }
      return result
    }
  }
}
