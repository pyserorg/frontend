import axios from 'axios'
import { API_ROOT, getCookie } from 'utils'


async function blogDetail(year, month, day, slug) {
  const response = await axios.get(
    `${API_ROOT}/blog/${year}/${month}/${day}/${slug}`,
  )
  return response.data
}


async function blogDetailEdit(year, month, day, slug, data) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.patch(
    `${API_ROOT}/blog/${year}/${month}/${day}/${slug}`,
    data,
    {
      headers: {
        'X-CSRF-TOKEN': csrf,
      },
    },
  )
  return response.data
}


export default {
  blogDetail,
  blogDetailEdit,
}
