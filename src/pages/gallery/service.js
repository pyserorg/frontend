import axios from 'axios'
import { API_ROOT } from 'utils'


async function album(albumName, year = null) {
  const prefix = year ? `${albumName}/${year}` : albumName
  const response = await axios.get(`${API_ROOT}/gallery/album/${prefix}`)
  return response.data
}


export default { album }
