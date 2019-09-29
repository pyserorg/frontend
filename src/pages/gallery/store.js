import service from './service'


export default class GalleryStore {
  constructor(detail, list) {
    this.detail = detail[0]
    this.setDetail = detail[1]
    this.list = list[0]
    this.setList = list[1]
  }

  fetch = async (albumName, year = null, page = 0) => {
    try {
      const response = await service.fetch(albumName, year, page)
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

  fetchAggregate = async (albumName, year = null, page = 0) => {
    try {
      const response = await service.fetch(albumName, year, page)
      const data = {
        ...response,
        files: {
          data: [
            ...this.detail.files.data,
            ...response.files.data,
          ],
          total: this.detail.files.total + response.files.data.length,
          pages: this.detail.files.pages,
        },
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
}
