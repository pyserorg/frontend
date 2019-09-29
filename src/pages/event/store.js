import service from './service'
import initial from './initial'


export default class EventStore {
  constructor(detail, list) {
    this.detail = detail[0]
    this.setDetail = detail[1]
    this.list = list[0]
    this.setList = list[1]
  }

  create = async (year) => {
    try {
      const response = await service.create(year)
      const result = {
        ...this.list,
        ok: true
      }
      result.data.push(response)
      result.total += 1
      this.setList(result)
      if (!this.detail.id) {
        this.setDetail(response)
      }
      return result
    } catch (error) {
      return {
        ...error,
        ok: false,
      }
    }
  }

  fetch = async (year) => {
    try {
      const response = await service.fetch(year)
      const result = {
        ...response,
        ok: true
      }
      this.setDetail(result)
      return result
    } catch (error) {
      const result = {
        ...initial.detail,
        ok: false,
      }
      this.setDetail(result)
      return {
        ...error,
        ...result,
      }
    }
  }

  fetchAll = async (page = 0, perpage = 10) => {
    try {
      const response = await service.fetchAll(page, perpage)
      this.setList(response)
      if (!this.detail.id && response.total > 0) {
        this.setDetail(response.data[0])
      }
      return {
        ...response,
        ok: true
      }
    } catch (error) {
      return {
        ...error,
        ok: false,
      }
    }
  }

  edit = async (id, data) => {
    try {
      const response = await service.edit(id, data)
      const result = {
        ...response,
        ok: true
      }
      this.setDetail(result)
      return result
    } catch (error) {
      const result = {
        ...error,
        ok: false,
      }
      this.setDetail(result)
      return result
    }
  }
}
