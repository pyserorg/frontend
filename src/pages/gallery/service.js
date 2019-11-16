import { API_ROOT, axios } from 'utils'


export default {
  fetch: async (albumName, year = null, page = 0) => {
    const suffix = year ? `${albumName}/${year}` : albumName
    const response = await axios.get(
      `${API_ROOT}/gallery/album/${suffix}`,
      { headers: { 'Page': page } },
    )
    return response.data
  },
}
