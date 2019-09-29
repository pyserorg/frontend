import service from './service'
import initial from './initial'


export default class CfSStore {
  constructor(detail) {
    this.detail = detail[0]
    this.setDetail = detail[1]
  }

  send = async (data) => {
    try {
      const response = await service.send(data)
      const result = {
        ...response,
        ok: true,
      }
      this.setDetail(result)
      return result

    } catch (error) {
      const result = {
        ...initial,
        ...error,
        ok: false,
      }
      this.setDetail(result)
      return result
    }
  }
}
