import axios from 'axios'
import { API_ROOT } from 'utils'


async function fetch(albumName, year = null, page = 0) {
  const suffix = year ? `${albumName}/${year}` : albumName
  const response = await axios.get(
    `${API_ROOT}/gallery/album/${suffix}`,
    { headers: { 'X-Page': page } },
  )
  return response.data
}


export default { fetch }
