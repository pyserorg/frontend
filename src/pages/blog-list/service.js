import axios from 'axios'
import { API_ROOT } from 'utils'


async function blogList(page) {
  const response = await axios.get(
    `${API_ROOT}/blog`,
    { headers: { 'X-Page': page } },
  )
  return response.data
}


export default {
  blogList,
}
