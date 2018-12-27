import axios from 'axios'
import { API_ROOT, getCookie } from 'utils'


async function blogAdd(title) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.post(
    `${API_ROOT}/blog`,
    {
      title,
      content: title,
      published: false,
    },
    {
      headers: {
        'X-CSRF-TOKEN': csrf,
      },
    },
  )
  return response.data
}


async function blogDelete(year, month, day, slug) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.delete(
    `${API_ROOT}/blog/${year}/${month}/${day}/${slug}`,
    {
      headers: {
        'X-CSRF-TOKEN': csrf,
      },
    },
  )
  return response.data
}


async function blogList(page) {
  const response = await axios.get(
    `${API_ROOT}/blog`,
    { headers: { 'X-Page': page } },
  )
  return response.data
}


export default {
  blogAdd,
  blogDelete,
  blogList,
}
